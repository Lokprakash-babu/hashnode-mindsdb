import connect from "@/lib/mindsdb-connection";
import { NextRequest, NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";

const listAllContests = () => {
  return `SELECT id,title,role,status,job_description FROM ${process.env.DB_NAME}.Contest`;
};
export async function GET() {
  try {
    await connect();
    const contestLists = await MindsDB.SQL.runQuery(listAllContests());
    if (contestLists.error_message) {
      throw contestLists.error_message;
    }
    return NextResponse.json({
      message: contestLists.rows,
    });
  } catch (err) {
    console.log("err in candidate contest", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
