import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { getServerSession } from "next-auth";

const getChapterQuery = (chapterId: string) => {
  return `
  SELECT about from planetscale_datasource.lesson_chapter_map WHERE id="${chapterId}"`;
};

const generateAnswerQuery = (about, question) => {
  return `
    SELECT about, question, answer
FROM question_answering_model
WHERE question = '${question}?'
AND about = '${about}';
    `;
};
export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return new NextResponse("UNAUTHENTICATED", { status: 401 });
  }
  try {
    await connect();
    const searchParams = req.nextUrl.searchParams;
    const chapterId = searchParams.get("chapterId");
    const question = searchParams.get("question");
    console.log("chapter and question ID", chapterId, question);
    if (!chapterId || !question) {
      return NextResponse.json(
        {
          message: "Invalid value for question or chapter ID in query params",
        },
        {
          status: 400,
          statusText: "Bad Request",
        }
      );
    }
    const chapterQuery = await MindsDB.SQL.runQuery(getChapterQuery(chapterId));
    if (chapterQuery.error_message) {
      throw chapterQuery.error_message;
    }
    if (chapterQuery.rows.length === 0) {
      throw "No about is available";
    }
    const { about } = chapterQuery.rows[0];
    console.log("about", about);
    const generateAnswer = await MindsDB.SQL.runQuery(
      generateAnswerQuery(about, question)
    );
    if (generateAnswer.error_message) {
      throw chapterQuery.error_message;
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
