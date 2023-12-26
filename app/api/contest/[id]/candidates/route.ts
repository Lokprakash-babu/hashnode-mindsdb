import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";

// Fetch candidates for that contest
const CONTEST_CANDIDATE_QUERY = (
  contest_id
) => `SELECT ${process.env.DB_NAME}.Account.*,${process.env.DB_NAME}.Candidate_Contest.*
FROM ${process.env.DB_NAME}.Candidate_Contest
JOIN ${process.env.DB_NAME}.Account ON ${process.env.DB_NAME}.Candidate_Contest.candidate_id = ${process.env.DB_NAME}.Account.id
WHERE planetscale_datasource.Candidate_Contest.contest_id = '${contest_id}';`;
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    console.log(">>> Minds db connected");
    const QUERY = CONTEST_CANDIDATE_QUERY(params.id);
    const contestDetails = await MindsDB.SQL.runQuery(QUERY);
    return NextResponse.json(
      {
        data: contestDetails.rows,
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
