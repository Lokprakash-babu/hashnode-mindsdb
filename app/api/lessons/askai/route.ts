import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { lessons } from "@/app/constants/lessons";

const generateAnswerQuery = (about, question) => {
  return `
    SELECT about, question, answer
FROM question_answering_model
WHERE question = "${question}?"
AND about = "${about}";
    `;
};
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !body.lessonId || !body.question) {
      return NextResponse.json(
        {
          message: "Bad Request",
        },
        {
          status: 400,
        }
      );
    }
    await connect();

    const chapterContent = lessons[body.lessonId].content;
    const generateAnswer = await MindsDB.SQL.runQuery(
      generateAnswerQuery(chapterContent, body.question)
    );
    if (generateAnswer.error_message) {
      throw generateAnswer.error_message;
    }
    if (generateAnswer.rows.length === 0) {
      throw "No answer available from generateAnswer";
    }
    const answer = generateAnswer.rows[0];
    console.log("answer", answer);
    return NextResponse.json(
      {
        message: answer.answer,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("error in lessons route", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
