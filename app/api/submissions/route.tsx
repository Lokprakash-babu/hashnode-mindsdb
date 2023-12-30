import connect from "@/lib/mindsdb-connection";
import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { getServerSession } from "next-auth";

//TODO: Add user id to the query
const getUsersSubmission = () => {
  return `
  SELECT ${process.env.DB_NAME}.Submission.id, ${process.env.DB_NAME}.Submission.entity_id, ${process.env.DB_NAME}.Feedback.score, ${process.env.DB_NAME}.Feedback.feedback
  FROM  ${process.env.DB_NAME}.Submission
  JOIN ${process.env.DB_NAME}.Feedback ON ${process.env.DB_NAME}.Submission.id = ${process.env.DB_NAME}.Feedback.submission_id;
    `;
};
export async function GET(req: Request) {
  const session = await getServerSession();

  // if (!session || !session.user) {
  //   return new NextResponse("UNAUTHENTICATED", { status: 401 });
  // }
  try {
    await connect();
    //TODO: Get the user Id from cookie/headers
    // const userId =
    const submissionList = await MindsDB.SQL.runQuery(getUsersSubmission());
    console.log(submissionList);
    if (submissionList.error_message) {
      throw submissionList.error_message;
    }
    const submissionListData = submissionList.rows;
    return NextResponse.json({
      message: submissionListData,
    });
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
