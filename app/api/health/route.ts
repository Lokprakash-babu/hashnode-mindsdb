import connect from "@/lib/mindsdb-connection";
import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
const QUERY = `SELECT article_title, question, answer
FROM qa_model_gpt4
WHERE question = 'Was Abraham Lincoln the sixteenth President of the United States?'
AND article_title = 'Abraham_Lincoln';`;
export async function GET(req: Request) {
  try {
    await connect();
    const queryResult = await MindsDB.SQL.runQuery(QUERY);
    console.log(queryResult);

    const greeting = "Mindsb Connected!!";
    const json = {
      greeting,
    };

    return NextResponse.json(json);
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
