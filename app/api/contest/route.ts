import { NextResponse, NextRequest } from "next/server";
import { mysqlConnection } from "@/lib/mysql-connection";
import moment from "moment";
import { auth } from "@clerk/nextjs";

const CreateContestQuery = () => {
  return `INSERT INTO ${process.env.NEXT_PLANETSCALE_DB_NAME}.Contest (id, title, description, start_date, end_date, questions, organisation_id, job_description, role, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
};
export async function POST(req: NextRequest) {
  try {
    const mysql = await mysqlConnection();
    const data = await req.json();
    const { userId } = auth();
    console.log("data", data);

    await mysql.query(CreateContestQuery(), [
      data.id,
      data.title,
      data.description,
      moment(data.start_date).unix(),
      moment(data.end_date).unix(),
      JSON.stringify(data.questions),
      data.organisation_id,
      data.job_description,
      data.role,
      userId,
    ]);
    return NextResponse.json({
      message: {
        contestId: data.id,
      },
    });
  } catch (err) {
    console.log("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
