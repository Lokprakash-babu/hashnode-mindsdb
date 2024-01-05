import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { mysqlConnection } from "@/lib/mysql-connection";
import connect from "@/lib/mindsdb-connection";
import { JsonExtractor } from "@/app/MindsdbHandlers/JsonExtractor";
import { generateFeedback } from "@/app/MindsdbHandlers/FeedbackGenerator";
import moment from "moment";
import { auth } from "@clerk/nextjs";

const submissionIdGenerator = () => {
  const epoch = moment().unix();
  return `submission_${epoch}`;
};
const getSubmissionQuery = (args: { userId: string; practiceId: string }) => {
  return `
    SELECT id FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission WHERE entity_id="${args.practiceId}" AND candidate_id="${args.userId}";
  `;
};

const createSubmissionRecord = () => {
  const submissionId = submissionIdGenerator();
  return {
    idGenerated: submissionId,
    query: `
    INSERT INTO ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission (candidate_id, entity_id, answer, id, type) VALUES (?, ?, ?, ?, "practice")
  `,
  };
};

const updateSubmissionRecord = () => {
  return `
  UPDATE ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission
SET answer = ?
WHERE id=?;
  `;
};

const createEntryInFeedbackTable = ({
  userId,
  submissionId,
  practiceId,
  feedback,
  score,
}) => {
  return `
    INSERT INTO ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback (candidate_id, entity_id, score, feedback, submission_id) VALUES ("${userId}", "${practiceId}", '${score}', '${feedback}', "${submissionId}")
  `;
};

const updateEntryInFeedbackTable = ({
  userId,
  practiceId,
  submissionId,
  feedback,
  score,
}) => {
  return `
  UPDATE ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback
  SET score="${score}", feedback='${feedback}'
  WHERE candidate_id="${userId}" AND entity_id="${practiceId}" AND submission_id="${submissionId}"
  `;
};

/**
 * For practice submission
 * 1. Create an entry in the submission table against a practice id for an user if the candidate didn't attempt the problem. Else, override the existing submission.
 * 2. Create an entry in the feedback table against the practice id for an user if it doesn't exist, else, overwrite it with the score and feedback.
 */
export async function POST(req: NextRequest) {
  try {
    const mysql = await mysqlConnection();
    await connect();
    const data = await req.json();
    const { practiceId, answer } = data;
    const { userId } = auth();
    if (!practiceId || !userId || !answer || !data.feedbackAnswer) {
      return NextResponse.json(
        {
          message: "Bad request",
        },
        {
          status: 400,
        }
      );
    }
    //Check if a submission exist for this user against this practise ID
    const [getSubmissionRecord] = await mysql.query(
      getSubmissionQuery({
        practiceId,
        userId,
      })
    );
    console.log("submission record", getSubmissionRecord);
    let submissionId = getSubmissionRecord?.[0]?.id;
    let isCreateFlowHappened = false;
    console.log(">>Submission ID", submissionId);
    //If submission exist, update the existing submission record, parallely create feedback and score to store it in feedback table
    if (submissionId) {
      await mysql.query(updateSubmissionRecord(), [
        JSON.stringify({ answer }),
        submissionId,
      ]);
      console.log("record updated");
    }
    //If submission doesn't exist, create submission, get the submission ID, generate feedback and store it in feedback table
    else {
      const { idGenerated, query } = createSubmissionRecord();

      await mysql.query(query, [
        userId,
        practiceId,
        JSON.stringify({
          answer,
        }),
        idGenerated,
      ]);
      submissionId = idGenerated;
      console.log("Record created");
      isCreateFlowHappened = true;
    }

    //MINDS DB for generating feedback
    const feedbackRequestedFor = data.feedbackAnswer;
    console.log(
      ">>>Generating feedback for",
      JSON.stringify({
        feedbackRequestedFor,
      })
    );
    const feedback = await MindsDB.SQL.runQuery(
      generateFeedback(feedbackRequestedFor)
    );
    const feedbackObject = feedback.rows?.[0]?.response;
    const extractJson = await MindsDB.SQL.runQuery(
      JsonExtractor(feedbackObject)
    );
    console.log("feedback object", feedbackObject);
    console.log("extracted json", extractJson?.rows?.[0]?.json);
    //create entry in feedback table
    if (!isCreateFlowHappened) {
      await mysql.query(
        updateEntryInFeedbackTable({
          userId,
          practiceId,
          feedback: JSON.stringify(extractJson?.rows?.[0]?.json),
          score: extractJson?.rows?.[0]?.json.score,
          submissionId,
        })
      );
    } else {
      await mysql.query(
        createEntryInFeedbackTable({
          userId,
          practiceId,
          submissionId,
          feedback: JSON.stringify(extractJson?.rows?.[0]?.json),
          score: extractJson?.rows?.[0]?.json.score,
        })
      );
    }

    return NextResponse.json({
      message: {
        submissionId,
      },
    });
  } catch (err) {
    console.log("error in practice submission", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
