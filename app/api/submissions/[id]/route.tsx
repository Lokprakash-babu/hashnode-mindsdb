import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { getServerSession } from "next-auth";

const getSubmissionDetailsQuery = (submissionId: string) => {
  return `SELECT 
  ${process.env.DB_NAME}.Submission.id, 
  ${process.env.DB_NAME}.Submission.entity_id, 
  ${process.env.DB_NAME}.Submission.answer,
  ${process.env.DB_NAME}.Feedback.score, 
  ${process.env.DB_NAME}.Feedback.feedback
FROM 
  ${process.env.DB_NAME}.Submission
JOIN 
  ${process.env.DB_NAME}.Feedback ON ${process.env.DB_NAME}.Submission.id = ${process.env.DB_NAME}.Feedback.submission_id
WHERE 
  ${process.env.DB_NAME}.Submission.id = "${submissionId}";`;
};
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return new NextResponse("UNAUTHENTICATED", { status: 401 });
  }
  try {
    await connect();
    console.log(">>> Minds db connected");
    console.log("req", params);
    const submissionDetails = await MindsDB.SQL.runQuery(
      getSubmissionDetailsQuery(params.id)
    );
    if (submissionDetails.error_message) {
      return NextResponse.json(
        {
          message: submissionDetails.error_message,
        },
        {
          status: 500,
        }
      );
    }
    console.log("Submission retrieved", submissionDetails.rows);
    return NextResponse.json(
      {
        message: submissionDetails.rows[0],
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("error in lessons route", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
