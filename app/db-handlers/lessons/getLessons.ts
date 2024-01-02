import { mysqlConnection } from "@/lib/mysql-connection";

const getLessonsQuery = `SELECT * FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.lessons`;
export const getLessonsQueryHandler = async () => {
  const mysql = await mysqlConnection();
  const [lessons] = await mysql.query(getLessonsQuery);
  return lessons;
};
