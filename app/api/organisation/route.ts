import { NextRequest, NextResponse } from "next/server";
import { mysqlConnection } from "@/lib/mysql-connection";
import { generateInsertQuery } from "@/app/utils/generateQuery";

const listOrg = () =>
  `SELECT * FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Organisation`;

export async function GET() {
  try {
    const mysql = await mysqlConnection();
    const [data] = await mysql.query(listOrg());
    return NextResponse.json(data || []);
  } catch (err) {
    console.log("err in listing orgs", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const mysql = await mysqlConnection();
    const data = await req.json();
    const QUERY = generateInsertQuery(
      "Organisation",
      Object.keys(data),
      Object.values(data),
      process.env.NEXT_PLANETSCALE_DB_NAME
    );
    const createOrg = await mysql.query(QUERY);
    return NextResponse.json(createOrg);
  } catch (err) {
    console.log("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
