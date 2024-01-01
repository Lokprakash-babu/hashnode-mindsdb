import { NextRequest, NextResponse } from "next/server";
import { mysqlConnection } from "@/lib/mysql-connection";
import { currentUser } from "@clerk/nextjs";

//TODO: Add user id to the query
const getUsersSubmission = () => {
  return `
  SELECT ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.id, ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.entity_id, ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.score, ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.feedback
  FROM  ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission
  JOIN ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback ON ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.id = ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.submission_id;
    `;
};
export async function GET(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  console.log(">>>USER ID", userId);
  try {
    //TODO: Get the user Id from cookie/headers
    // const userId =
    const mysql = await mysqlConnection();
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type") || "contest";
    console.log("type", type);

    const [submissionList] = await mysql.query(getUsersSubmission());
    console.log(submissionList);

    return NextResponse.json({
      message: submissionList,
    });
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
