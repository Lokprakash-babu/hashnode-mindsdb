import { NextRequest, NextResponse } from "next/server";
import { mysqlConnection } from "@/lib/mysql-connection";
import { generateInsertQuery } from "@/app/utils/generateQuery";
import { getServerSession } from "next-auth";

const listOrg = () =>
  `SELECT * FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Organisation`;

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user) {
    return new NextResponse("UNAUTHENTICATED", { status: 401 });
  }
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
  const session = await getServerSession();

  if (!session || !session.user) {
    return new NextResponse("UNAUTHENTICATED", { status: 401 });
  }
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
