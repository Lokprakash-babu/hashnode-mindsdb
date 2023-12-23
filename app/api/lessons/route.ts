import connect from "@/lib/mindsdb-connection";
import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";

export async function GET(req: Request) {
  try {
    // await connect();
    console.log("lessons", req);
    // const answerQuery = await MindsDB.SQL.runQuery(QUERY);
    // console.log(answerQuery);

    // const greeting = "Mindsb Connected!!";
    // const json = {
    //   greeting,
    // };

    // return NextResponse.json(json);
    return "Success";
  } catch (err) {
    console.log("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
