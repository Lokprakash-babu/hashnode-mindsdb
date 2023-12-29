import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { generateUpdateQuery, selectAllQuery } from "@/app/utils/generateQuery";
import { mysqlConnection } from "@/lib/mysql-connection";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mysql = await mysqlConnection();
    console.log(">>> Minds db connected");
    const QUERY = selectAllQuery(
      "Contest",
      `id='${params.id}'`,
      process.env.NEXT_PLANETSCALE_DB_NAME
    );
    const [contestDetailsRow] = await mysql.query(QUERY);
    return NextResponse.json(
      {
        data: contestDetailsRow,
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const data = await req.json();
    const QUERY = generateUpdateQuery("Contest", data, params.id);
    const updateContest = await MindsDB.SQL.runQuery(QUERY);
    return NextResponse.json(updateContest);
  } catch (err) {
    console.error("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
