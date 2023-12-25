import connect from "@/lib/mindsdb-connection";
import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { generateInsertQuery } from "@/app/utils/generateQuery";

export async function POST(req: Request) {
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
