import { mysqlConnection } from "@/lib/mysql-connection";
import { NextRequest, NextResponse } from "next/server";
import { findUser } from "../../auth/[...nextauth]/route";
import connect from "@/lib/mindsdb-connection";
import { generateUpdateQuery } from "@/app/utils/generateQuery";
import { getServerSession } from "next-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  // if (!session || !session.user) {
  //   return new NextResponse("UNAUTHENTICATED", { status: 401 });
  // }
  try {
    const mysql = await mysqlConnection();
    const [data] = await mysql.query(findUser(params.id, "id"));
    return NextResponse.json(data?.[0] || {});
  } catch (err) {
    console.log("err in candidate contest", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  // if (!session || !session.user) {
  //   return new NextResponse("UNAUTHENTICATED", { status: 401 });
  // }
  try {
    const mysql = await mysqlConnection();
    const data = await req.json();
    const QUERY = generateUpdateQuery(
      "Account",
      data,
      params.id,
      process.env.NEXT_PLANETSCALE_DB_NAME
    );

    const updateAccount = await mysql.query(QUERY);
    return NextResponse.json(updateAccount);
  } catch (err) {
    console.error("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
