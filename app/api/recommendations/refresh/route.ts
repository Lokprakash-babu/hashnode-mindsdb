import connect from "@/lib/mindsdb-connection";
import MindsDB from "mindsdb-js-sdk";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connect();
    const QUERY = `Drop model practice_recommendations`;
    await MindsDB.SQL.runQuery(QUERY);
    const RECREATE_MODEL = `CREATE MODEL practice_recommendations
    FROM ${process.env.DB_NAME} (SELECT * FROM feedback_view)
    PREDICT candidate_id
    USING
      engine = 'lightfm',
      item_id = 'candidate_id',
      user_id = 'entity_id',
      threshold = 5,
      n_recommendations = 10;`;
    await MindsDB.SQL.runQuery(RECREATE_MODEL);
    return NextResponse.json({ message: "model create" });
  } catch (err) {
    console.log("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
