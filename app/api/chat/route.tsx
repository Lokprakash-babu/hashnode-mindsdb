import connect from "@/lib/mindsdb-connection";
import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import { model } from "@/app/constants/models";
const generateChatQuery = (
  previousMessages: { type: "user" | "bot"; message: string }[],
  latestMessage: string,
  context: string
) => {
  const previousMessagesString = previousMessages
    .filter((message) => {
      return message.type === "user";
    })
    .map((message) => {
      return `${message.type}: ${message.message}`;
    })
    .join(",");
  return `
SELECT response
FROM ${model.conversationalModel}
WHERE previous_messages = "${previousMessagesString}"
AND latest_message = "${latestMessage}" AND context="${context}"`;
};
export async function POST(req: Request) {
  try {
    await connect();
    const requestBody = await req.json();
    const { previousMessages, latestMessage, context } = requestBody;
    console.log("request body", requestBody);
    if (
      !previousMessages ||
      !previousMessages.length ||
      !latestMessage ||
      !context
    ) {
      return NextResponse.json(
        {
          message: "Bad Request",
        },
        {
          status: 400,
        }
      );
    }
    const queryResult = await MindsDB.SQL.runQuery(
      generateChatQuery(previousMessages, latestMessage, context)
    );
    console.log("query result", queryResult);

    if (queryResult.error_message) {
      throw queryResult.error_message;
    }

    return NextResponse.json({
      message: queryResult.rows[0].response,
    });
  } catch (err) {
    console.log("error in chat", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
