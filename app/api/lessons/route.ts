import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import {
  ALLOWED_CATEGORIES,
  AVAILABLE_CATEGORIES,
} from "@/app/constants/categories";
import { getServerSession } from "next-auth";

const getLessonIdAndTitleQuery = () => {
  return `
  SELECT * from planetscale_datasource.lessons`;
};

// const getChaptersQuery = (lessonId: string) => {
//   return `
//   SELECT title, about, chapter_content, chapter_order from planetscale_datasource.lesson_chapter_map WHERE lesson_id="${lessonId}" ORDER BY chapter_order
//   `;
// };
export async function GET(req: NextRequest) {
  const session = await getServerSession();

  // if (!session || !session.user) {
  //   return new NextResponse("UNAUTHENTICATED", { status: 401 });
  // }
  try {
    await connect();
    console.log(">>> Minds db connected");
    const lessonIdAndTitle = await MindsDB.SQL.runQuery(
      getLessonIdAndTitleQuery()
    );
    if (lessonIdAndTitle.error_message) {
      return NextResponse.json(
        {
          message: lessonIdAndTitle.error_message,
        },
        {
          status: 500,
        }
      );
    }
    console.log("lesson id retrieved", lessonIdAndTitle.rows);
    const response = {};
    return NextResponse.json(
      {
        message: lessonIdAndTitle.rows,
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
