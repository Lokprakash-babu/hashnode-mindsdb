import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { generateUpdateQuery, selectAllQuery } from "@/app/utils/generateQuery";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    console.log(">>> Minds db connected");
    const QUERY = selectAllQuery("Contest", `id='${params.id}'`);
    console.log(QUERY);
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
