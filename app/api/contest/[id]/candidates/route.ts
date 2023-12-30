import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { getServerSession } from "next-auth";

// Fetch candidates for that contest
const CONTEST_CANDIDATE_QUERY = (
  entity_id
) => `SELECT ${process.env.DB_NAME}.Account.*,${process.env.DB_NAME}.Feedback.*
FROM ${process.env.DB_NAME}.Feedback
JOIN ${process.env.DB_NAME}.Account ON ${process.env.DB_NAME}.Feedback.candidate_id = ${process.env.DB_NAME}.Account.id
WHERE planetscale_datasource.Feedback.entity_id = '${entity_id}';`;
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

//   if (!session || !session.user) {
//     return new NextResponse("UNAUTHENTICATED", { status: 401 });
//   }
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
