import { mysqlConnection } from "@/lib/mysql-connection";
import { NextRequest, NextResponse } from "next/server";

const getAnswerQuery = () => {
  return `SELECT answer from ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission WHERE entity_id=?`;
};
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mysql = await mysqlConnection();
    const [answers] = await mysql.query(getAnswerQuery(), params.id);
    console.log(">>>answers", answers[0].answer);
    return NextResponse.json({
      message: answers[0].answer,
    });
  } catch (err) {
    console.error("err in fetching the saved answer", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
