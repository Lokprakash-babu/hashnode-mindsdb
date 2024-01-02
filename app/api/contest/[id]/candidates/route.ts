import { NextRequest, NextResponse } from "next/server";
import { mysqlConnection } from "@/lib/mysql-connection";

// Fetch candidates for that contest
const CONTEST_CANDIDATE_QUERY = (
  entity_id
) => `SELECT ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account.*,${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.*
FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback
JOIN ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account ON ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.candidate_id = ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account.id
WHERE ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.entity_id = '${entity_id}';`;
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mysql = await mysqlConnection();
    const QUERY = CONTEST_CANDIDATE_QUERY(params.id);
    const [contestDetails] = await mysql.query(QUERY);
    return NextResponse.json(
      {
        data: contestDetails,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("error in contest detail route", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
