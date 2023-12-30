import { mysqlConnection } from "@/lib/mysql-connection";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * End contest flow
 * Request body should contain contestId, and the answers
 * Insert the answers to submission table where contestId and the userId matches
 * Generate the feedback
 * Insert the feedback to feedback table where candidate and contest id matches
 */

const db = process.env.NEXT_PLANETSCALE_DB_NAME;

const fetchSubmissionRecord = (candidateId, contestId) => {
  return `SELECT id from ${db}.Submission WHERE candidate_id="${candidateId}" AND entity_id="${contestId}"`;
};

const updateSubmissionRecord = (candidateId, contestId) => {
  return `UPDATE ${db}.Submission SET answer=? WHERE candidate_id="${candidateId}" AND entity_id="${contestId}"`;
};

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  // if (!session || !session.user) {
  //   return new NextResponse("UNAUTHENTICATED", { status: 401 });
  // }
  try {
    const data = await req.json();
    //TODO: Get the userId from session
    const userId = "test_user_lok";
    if (!data.answers || !data.contestId) {
      return NextResponse.json(
        {
          message: "Invalid value for answers or contestId",
        },
        {
          status: 400,
        }
      );
    }

    const mysql = await mysqlConnection();
    const [fetchSubmissionRecordData] = await mysql.query(
      fetchSubmissionRecord(userId, data.contestId)
    );
    const submissionId = fetchSubmissionRecordData?.[0]?.id;
    if (!submissionId) {
      return NextResponse.json(
        {
          message: "You have not started the contest",
        },
        {
          status: 400,
        }
      );
    }
    await mysql.query(updateSubmissionRecord(userId, data.contestId), [
      JSON.stringify({ answer: data.answers }),
    ]);

    return NextResponse.json({
      message: submissionId,
    });
  } catch (err) {
    console.log("err in end contest", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
