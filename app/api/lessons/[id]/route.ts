import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";

const getChaptersQuery = (lessonId: string) => {
  return `
  SELECT * from planetscale_datasource.lesson_chapter_map WHERE lesson_id="${lessonId}" ORDER BY chapter_order
  `;
};
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    console.log(">>> Minds db connected");
    console.log("req", params);
    const chaptersQuery = await MindsDB.SQL.runQuery(
      getChaptersQuery(params.id)
    );
    if (chaptersQuery.error_message) {
      return NextResponse.json(
        {
          message: chaptersQuery.error_message,
        },
        {
          status: 500,
        }
      );
    }
    console.log("Chapters retrieved", chaptersQuery.rows);
    return NextResponse.json(
      {
        message: chaptersQuery.rows,
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
