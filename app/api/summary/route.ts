import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { model } from "@/app/constants/models";

const getSummaryQuery = (article: string) => {
  return `
  SELECT article, highlights
FROM ${model.summaryBot}
WHERE article = "${article}";
  `;
};
export async function POST(req: NextRequest) {
  try {
    await connect();
    const requestBody = await req.json();
    console.log("requestBody", requestBody);
    if (!requestBody || !requestBody.content) {
      return NextResponse.json(
        {
          message: "Invalid value for content",
        },
        {
          status: 400,
          statusText: "Bad request",
        }
      );
    }
    const summaryQueryResult = await MindsDB.SQL.runQuery(
      getSummaryQuery(requestBody.content)
    );
    console.log("summary query result", summaryQueryResult);

    if (summaryQueryResult.error_message) {
      throw summaryQueryResult.error_message;
    }
    const summary = summaryQueryResult.rows[0].highlights;
    return NextResponse.json({
      message: summary,
    });
  } catch (err) {
    console.log("error in summary route", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
