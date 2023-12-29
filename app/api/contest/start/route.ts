import { mysqlConnection } from "@/lib/mysql-connection";
import { NextRequest, NextResponse } from "next/server";

//Start contest flow
//Create a dummy submission entry in the submission table, if there is no submission entry.
//If there is a submission entry, don't do anything.
//Retrive the submissionId associated with the user.
//Create an entry in the feedback table with startTime, contest ID, user Id and submission Id.
//If an entry is already there, return the startTime.
//Else, return the already entered startTime.

const db = process.env.NEXT_PLANETSCALE_DB_NAME;
const fetchSubmissionRecord = (candidateId, contestId) => {
  return `SELECT id from ${db}.Submission WHERE candidate_id="${candidateId}" AND entity_id="${contestId}"`;
};

const createSubmissionRecord = (candidateId, contestId, submissionId) => {
  return `
    INSERT INTO ${db}.Submission (candidate_id, entity_id, id) VALUES ("${candidateId}", "${contestId}", "${submissionId}");
    `;
};

const fetchFeedbackRecord = (candidateId, submissionId) => {
  return `SELECT start_time_candidate from ${db}.Feedback WHERE candidate_id="${candidateId}" AND submission_id="${submissionId}"`;
};

const createFeedbackRecord = (
  candidateId,
  contestId,
  submissionId,
  start_time
) => {
  return `
    INSERT INTO ${db}.Feedback (candidate_id, entity_id, submission_id, start_time_candidate) VALUES ("${candidateId}", "${contestId}", "${submissionId}", "${start_time}");
    `;
};

export async function POST(req: NextRequest) {
  const mysql = await mysqlConnection();

  try {
    const data = await req.json();
    //TODO: Get the userId from session
    const userId = "test_user_lok";
    if (!data.contestId) {
      return NextResponse.json(
        {
          message: "Invalid value for startTime or contestId",
        },
        {
          status: 400,
        }
      );
    }

    const [submissionRecordData] = await mysql.query(
      fetchSubmissionRecord(userId, data.contestId)
    );
    const submissionId = submissionRecordData?.[0]?.id;
    if (submissionId) {
      //Fetch the start time
      const [feedbackRecord] = await mysql.query(
        fetchFeedbackRecord(userId, submissionId)
      );
      const startTime = feedbackRecord[0].start_time_candidate;
      return NextResponse.json({
        message: {
          startTime,
        },
      });
    } else {
      //Create submission record
      const toBeGeneratedSubmissionId = `submission_${Date.now()}`;
      await mysql.query(
        createSubmissionRecord(
          userId,
          data.contestId,
          toBeGeneratedSubmissionId
        )
      );
      //Create an entry in the feedback table.
      const currentTime = Date.now();
      await mysql.query(
        createFeedbackRecord(
          userId,
          data.contestId,
          toBeGeneratedSubmissionId,
          currentTime
        )
      );

      return NextResponse.json({
        message: {
          startTime: currentTime,
        },
      });
    }
  } catch (err) {
    console.log("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
