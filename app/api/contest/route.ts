import connect from "@/lib/mindsdb-connection";
import { NextResponse, NextRequest } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { generateInsertQuery, selectAllQuery } from "@/app/utils/generateQuery";

// Get contest and candidates who have subscribed to that contest
const generateListQuery = (
  key,
  value
) => `SELECT c.*, COUNT(cc.entity_id) AS candidate_count
FROM ${process.env.DB_NAME}.Contest c
LEFT JOIN ${process.env.DB_NAME}.Feedback cc ON c.id = cc.entity_id
WHERE c.${key} = ${value}
GROUP BY c.id;`;

export async function POST(req: NextRequest) {
  try {
    await connect();
    const data = await req.json();
    const QUERY = generateInsertQuery(
      "Contest",
      Object.keys(data),
      Object.values(data)
    );
    const createContest = await MindsDB.SQL.runQuery(QUERY);
    return NextResponse.json(createContest);
  } catch (err) {
    console.log("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  //   if (!session || !session.user) {
  //     return new NextResponse("UNAUTHENTICATED", { status: 401 });
  //   }
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const key = searchParams.keys().next().value;
    if (!["organisation_id", "account_id"].includes(key)) {
      return NextResponse.json({});
    }
    const QUERY = generateListQuery(key, searchParams.values().next().value);
    const contestLists = await MindsDB.SQL.runQuery(QUERY);
    return NextResponse.json(contestLists);
  } catch (err) {
    console.log("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
