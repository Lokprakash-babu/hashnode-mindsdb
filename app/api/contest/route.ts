import connect from "@/lib/mindsdb-connection";
import { NextResponse, NextRequest } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { generateInsertQuery, selectAllQuery } from "@/app/utils/generateQuery";
import { mysqlConnection } from "@/lib/mysql-connection";
import moment from "moment";

// Get contest and candidates who have subscribed to that contest
const generateListQuery = (
  key,
  value
) => `SELECT c.*, COUNT(cc.entity_id) AS candidate_count
FROM ${process.env.DB_NAME}.Contest c
LEFT JOIN ${process.env.DB_NAME}.Feedback cc ON c.id = cc.entity_id
WHERE c.${key} = ${value}
GROUP BY c.id;`;

const CreateContestQuery = () => {
  return `INSERT INTO ${process.env.NEXT_PLANETSCALE_DB_NAME}.Contest (id, title, description, start_date, end_date, questions, organisation_id, job_description, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
};
export async function POST(req: NextRequest) {
  try {
    const mysql = await mysqlConnection();
    const data = await req.json();
    console.log("data", data);

    await mysql.query(CreateContestQuery(), [
      data.id,
      data.title,
      data.description,
      moment(data.start_date).unix(),
      moment(data.end_date).unix(),
      JSON.stringify(data.questions),
      data.organisation_id,
      data.job_description,
      data.role,
    ]);
    return NextResponse.json({
      message: {
        contestId: data.id,
      },
    });
  } catch (err) {
    console.log("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
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
