import { NextRequest, NextResponse } from "next/server";
import { mysqlConnection } from "@/lib/mysql-connection";
const listAllContests = () => {
  return `SELECT id, title, role, job_description, start_date, end_date FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Contest`;
};
export async function GET() {
  try {
    const mysql = await mysqlConnection();
    const [data] = await mysql.query(listAllContests());
    console.log("contest lists", data);
    return NextResponse.json({
      message: data,
    });
  } catch (err) {
    console.log("err in candidate contest", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
