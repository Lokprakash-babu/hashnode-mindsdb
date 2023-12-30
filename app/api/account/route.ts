import { mysqlConnection } from "@/lib/mysql-connection";
import { NextRequest, NextResponse } from "next/server";
import { findUser } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    const mysql = await mysqlConnection();
    const [data] = await mysql.query(
      findUser(request.nextUrl.searchParams.get("email"), "email")
    );
    return NextResponse.json(data?.[0] || {});
  } catch (err) {
    console.log("err in candidate contest", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
