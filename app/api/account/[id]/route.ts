import { findUser } from "@/app/utils/queries";
import { mysqlConnection } from "@/lib/mysql-connection";
import { NextRequest, NextResponse } from "next/server";

const createUser = () => {
  return `INSERT INTO ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account (id,name, email, account_type,organisation_id, area_of_interest, avatar_url, country, city, phone_number, document_url, experience )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const mysql = await mysqlConnection();
    const [data] = await mysql.query(findUser(params.id, "id"));
    if (!data?.[0]) {
      return NextResponse.json(
        {
          message: "Account not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(data?.[0] || {});
  } catch (err) {
    console.log("err in candidate contest", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const mysql = await mysqlConnection();
    const data = await req.json();
    const { email, id, name } = data;
    if (!email || !id || !name) {
      return NextResponse.json(
        {
          message: "Bad request",
        },
        {
          status: 400,
        }
      );
    }
    const [createAccount] = await mysql.query(createUser(), [
      data.id,
      data.name,
      data.email,
      data.account_type,
      data.organisation_id || "",
      data.area_of_interest || "",
      data.avatar_url || "",
      data.country,
      data.city,
      data.phone_number,
      data.document_url,
      data.experience,
    ]);
    console.log("create account", createAccount);
    return NextResponse.json(
      {
        message: "Account created",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
