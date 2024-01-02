import { mysqlConnection } from "@/lib/mysql-connection";

const getContestsQuery = (userId?: string) =>
  `SELECT * FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Contest ${
    userId ? `WHERE created_by="${userId}"` : ""
  }`;
export const getContestListHandler = async (userId?: string) => {
  const mysql = await mysqlConnection();
  const [contestLists] = await mysql.query(getContestsQuery(userId));
  console.log("DB Contest lists", contestLists);
  return contestLists;
};
