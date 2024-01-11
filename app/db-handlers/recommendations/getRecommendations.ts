import connect from "@/lib/mindsdb-connection";
import MindsDB from "mindsdb-js-sdk";
import { mysqlConnection } from "@/lib/mysql-connection";

export async function getRecommendations() {
  try {
    const userList = [];
    await connect();
    const mysql = await mysqlConnection();
    const QUERY = `SELECT b.*
    FROM practice_recommendations AS b
    where recommender_type = 'user_item' order by score`;

    const recommendationResponse = await MindsDB.SQL.runQuery(QUERY);
    
    recommendationResponse.rows.forEach(({ item_id }) => {
      //@ts-ignore
      if (!userList.includes(item_id)) {
        //@ts-ignore
        userList.push(item_id);
      }
    });
    const FETCH_USER_INFO = `Select * from ${
      process.env.NEXT_PLANETSCALE_DB_NAME
    }.Account where id in (${'"' + userList.join('","') + '"'})`;
    const [userDetails] = await mysql.query(FETCH_USER_INFO);
    return userDetails;
  } catch (err) {
    throw err;
  }
}
