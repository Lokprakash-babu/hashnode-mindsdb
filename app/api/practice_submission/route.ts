import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";

const submissionIdGenerator = () => {
  const epoch = Date.now();
  return `submission_${epoch}`;
};
const getSubmissionQuery = (args: { userId: string; practiceId: string }) => {
  return `
    SELECT id FROM ${process.env.DB_NAME}.Submission WHERE entity_id="${args.practiceId}" AND candidate_id="${args.userId}";
  `;
};

const createSubmissionRecord = (userId, practiceId, answer) => {
  const submissionId = submissionIdGenerator();
  const answerString = JSON.stringify({
    answer,
  });
  console.log("answer string", answerString);
  return {
    idGenerated: submissionId,
    query: `
    INSERT INTO ${process.env.DB_NAME}.Submission ('candidate_id', 'entity_id', 'answer', 'id') VALUES ("${userId}", "${practiceId}", '${answerString}', "${submissionId}")
  `,
  };
};

const updateSubmissionRecord = (submissionId, answer) => {
  return `
  UPDATE ${process.env.DB_NAME}.Submission
SET answer = "${answer}"
WHERE id="${submissionId}";
  `;
};

const generateFeedback = (answers) => {
  const answerString = answers
    .filter((answer) => {
      return answer.type === "user";
    })
    .map((filterAnswer) => {
      return `User: ${filterAnswer.message}`;
    })
    .join(",");
  return `
  SELECT response FROM evaluator_model
  WHERE answer="${answerString}"
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
    INSERT INTO ${process.env.DB_NAME}.Feedback ('candidate_id', 'entity_id', 'score', 'feedback', 'submission_id') VALUES ("${userId}", "${practiceId}", '${score}', '${feedback}', "${submissionId}")
  `;
};
/**
 * For practice submission
 * 1. Create an entry in the submission table against a practice id for an user if the candidate didn't attempt the problem. Else, override the existing submission.
 * 2. Create an entry in the feedback table against the practice id for an user if it doesn't exist, else, overwrite it with the score and feedback.
 */
export async function POST(req: NextRequest) {
  try {
    await connect();
    const data = await req.json();
    const { practiceId, userId, answer } = data;
    if (!practiceId || !userId || !answer) {
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
    const getSubmissionRecord = await MindsDB.SQL.runQuery(
      getSubmissionQuery({
        practiceId,
        userId,
      })
    );
    if (getSubmissionRecord.error_message) {
      throw getSubmissionRecord.error_message;
    }
    console.log("submission record", getSubmissionRecord);
    let submissionId = getSubmissionRecord.rows?.[0]?.id;
    console.log(">>Submission ID", submissionId);
    //If submission exist, update the existing submission record, parallely create feedback and score to store it in feedback table
    if (submissionId) {
      const updateQuery = await MindsDB.SQL.runQuery(
        updateSubmissionRecord(submissionId, answer)
      );
      if (updateQuery.error_message) {
        throw updateQuery.error_message;
      }
      console.log("record updated");
    }
    //If submission doesn't exist, create submission, get the submission ID, generate feedback and store it in feedback table
    else {
      const { idGenerated, query } = createSubmissionRecord(
        userId,
        practiceId,
        answer
      );

      const createRecord = await MindsDB.SQL.runQuery(query);
      if (createRecord.error_message) {
        throw createRecord.error_message;
      }
      submissionId = idGenerated;
      console.log("Record created");
    }
    const feedback = await MindsDB.SQL.runQuery(generateFeedback(answer));
    const feedbackObject = JSON.parse(feedback.rows?.[0]?.response);
    console.log("feedback object", feedbackObject);

    //create entry in feedback table
    const feedbackTableUpdate = await MindsDB.SQL.runQuery(
      createEntryInFeedbackTable({
        userId,
        practiceId,
        submissionId,
        feedback: feedback.rows?.[0]?.response,
        score: feedbackObject.score,
      })
    );
    if (feedbackTableUpdate.error_message) {
      throw feedbackTableUpdate.error_message;
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
