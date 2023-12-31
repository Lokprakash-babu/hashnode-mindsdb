import { mysqlConnection } from "@/lib/mysql-connection";
import { NextRequest, NextResponse } from "next/server";

import connect from "@/lib/mindsdb-connection";
import { generateUpdateQuery } from "@/app/utils/generateQuery";

export const findUser = (data, key = "email") => {
  return `SELECT * FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account where ${key}='${data}'`;
};

export const insertUser = ({ id, name, email, image }) => {
  return `INSERT INTO ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account (id,name, email, avatar_url)
  VALUES ('${id}','${name}', '${email}', '${image}');`;
};
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
