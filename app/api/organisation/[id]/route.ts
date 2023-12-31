import { selectAllQuery } from "@/app/utils/generateQuery";
import { mysqlConnection } from "@/lib/mysql-connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mysql = await mysqlConnection();
    const QUERY = selectAllQuery(
      "Organisation",
      `id='${params.id}'`,
      process.env.NEXT_PLANETSCALE_DB_NAME
    );
    const [organisation] = await mysql.query(QUERY);
    return NextResponse.json(
      {
        organisation: organisation?.[0],
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("error in contest detail route", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
