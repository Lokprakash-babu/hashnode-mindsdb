import { NextRequest, NextResponse } from "next/server";
import { mysqlConnection } from "@/lib/mysql-connection";
import { auth, currentUser } from "@clerk/nextjs";

//TODO: Add user id to the query
const getUsersSubmission = (candidate_id, type) => {
  return `
  SELECT 
  ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.id, 
  ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.entity_id, 
  ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.score, 
  ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.feedback
FROM  
  ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission
JOIN 
  ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback 
ON 
  ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.id = ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.submission_id
WHERE 
  ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.candidate_id = "${candidate_id}" 
  AND ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.type = "${type}";
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
    const { userId } = auth();

    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type") || "contest";
    console.log("type", type);

    const [submissionList] = await mysql.query(
      getUsersSubmission(userId || "", type)
    );
    console.log(submissionList);

    return NextResponse.json({
      message: submissionList,
    });
  } catch (err) {
    console.log("error in submission route", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
