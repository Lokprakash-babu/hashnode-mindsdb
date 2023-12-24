import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import {
  ALLOWED_CATEGORIES,
  AVAILABLE_CATEGORIES,
} from "@/app/constants/categories";

const getLessonIdAndTitleQuery = (category: string) => {
  return `
  SELECT id, title from planetscale_datasource.lessons WHERE category="${category}"
  `;
};

const getChaptersQuery = (lessonId: string) => {
  return `
  SELECT title, about, chapter_content, chapter_order from planetscale_datasource.lesson_chapter_map WHERE lesson_id="${lessonId}" ORDER BY chapter_order
  `;
};
export async function GET(req: NextRequest) {
  try {
    await connect();
    console.log(">>> Minds db connected");
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category") as AVAILABLE_CATEGORIES;
    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json(
        {
          message: "Invalid value for category",
        },
        {
          status: 400,
        }
      );
    }
    console.log(">>> category received", category);
    const lessonIdAndTitle = await MindsDB.SQL.runQuery(
      getLessonIdAndTitleQuery(category)
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
    const { id, title } = lessonIdAndTitle.rows[0];
    console.log("lesson id retrieved", id);
    const chapters = await MindsDB.SQL.runQuery(getChaptersQuery(id));
    if (chapters.error_message) {
      return NextResponse.json(
        {
          message: chapters.error_message,
        },
        {
          status: 500,
        }
      );
    }
    console.log("chapters accessed", chapters);
    const response = {
      title,
      chapters: chapters.rows,
    };
    return NextResponse.json(
      {
        message: response,
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
