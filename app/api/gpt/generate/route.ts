import connect from "@/lib/mindsdb-connection";
import MindsDB from "mindsdb-js-sdk";
import { NextRequest, NextResponse } from "next/server";
const TYPE_MAPPING = {
  email: "like a email conversation based scenario in markdown format",
  bot_conversation:
    "like a bot conversation with the background and a pre-read for the scenario in markdown format",
};

const TYPE_RESPONSE_MAPPING = {
  email: {
    columnNames: ["article_title", "conversation_tone", "question", "answer"],
    context: {
      db: "mindsdb",
    },
    type: "table",
    rows: [
      {
        article_title: "Customer Support Contest Question",
        conversation_tone: "angry",
        question:
          "Can you generate a problem statement where the customer is facing a refund issue ? like a email conversation based scenario",
        answer:
          "Subject: Urgent Refund Issue - Unacceptable Customer Service\n\nDear [Customer Support],\n\nI am writing to express my extreme dissatisfaction with the recent experience I had with your company's refund process. I am appalled by the lack of professionalism and disregard for customer satisfaction that I have encountered.\n\nOn [date], I purchased [product/service] from your website, order number [order number]. Unfortunately, the item I received was defective and did not meet the specifications as advertised. Consequently, I immediately contacted",
      },
    ],
  },
  bot_conversation: {
    columnNames: ["article_title", "conversation_tone", "question", "answer"],
    context: {
      db: "mindsdb",
    },
    type: "table",
    rows: [
      {
        article_title: "Customer Support Contest Question",
        conversation_tone: "angry",
        question:
          "Can you generate a problem statement where the customer is unable to use your saas application ? like a bot conversation with the background and a pre-read for the scenario in markdown format",
        answer:
          "**Problem Statement: Customer Unable to Use SaaS Application**\n\nBackground:\nThe SaaS application is designed to simplify and streamline various business processes for customers. It offers a user-friendly interface, advanced features, and seamless integration with existing systems. However, despite its capabilities, there are instances where customers face difficulties in utilizing the application effectively.\n\nPre-read:\nAs a customer, you have invested in our SaaS application with high expectations of enhancing your business operations. However, you are currently experiencing frustration and anger due",
      },
    ],
  },
};
export async function POST(req: NextRequest) {
  try {
    await connect();
    const data = await req.json();
    const { question, type, conversation_tone, context } = data;
    const QUERY = `SELECT article_title,conversation_tone, question, answer
FROM ${process.env.MODEL_NAME}
WHERE question = '${question} ${TYPE_MAPPING[type]}'
AND conversation_tone = '${conversation_tone}' AND article_title = '${context}';`;
    const promptResponse = TYPE_RESPONSE_MAPPING[type];
    // const promptResponse = await MindsDB.SQL.runQuery(QUERY);
    return NextResponse.json(promptResponse);
  } catch (err) {
    console.log("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
