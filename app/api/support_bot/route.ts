import connect from "@/lib/mindsdb-connection";
import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { getServerSession } from "next-auth";
const CREATE_ML_QUERY = `CREATE ML_ENGINE support_bot
FROM openai
USING
    api_key = 'your-openai-api-key-for-gpt-4';`;

const CREATE_MODEL = `CREATE MODEL qa_model_gpt4_test
PREDICT answer
USING
    engine = 'support_bot',
    model_name = 'gpt-3.5-turbo',
    prompt_template = 'answer the question of text:{{question}} about text:{{article_title}}';`;

const QUERY = `SELECT article_title, question, answer
FROM qa_model_gpt4
WHERE question = 'Was Abraham Lincoln the sixteenth President of the United States?'
AND article_title = 'Abraham_Lincoln';`;
export async function GET(req: Request) {
  const session = await getServerSession();

  // if (!session || !session.user) {
  //   return new NextResponse("UNAUTHENTICATED", { status: 401 });
  // }
  try {
    await connect();
    // const mlEngineQuery = await MindsDB.SQL.runQuery(CREATE_ML_QUERY);
    // console.log(mlEngineQuery);

    // const mlModelQuery = await MindsDB.SQL.runQuery(CREATE_MODEL);
    // console.log(mlModelQuery);

    const answerQuery = await MindsDB.SQL.runQuery(QUERY);
    console.log(answerQuery);

    const greeting = "Mindsb Connected!!";
    const json = {
      greeting,
    };

    return NextResponse.json(json);
  } catch (err) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
