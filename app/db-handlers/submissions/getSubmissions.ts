import { mysqlConnection } from "@/lib/mysql-connection";

const getSubmissionsQuery = (userId: string, type?: string) =>
  `SELECT * FROM ${
    process.env.NEXT_PLANETSCALE_DB_NAME
  }.Submission WHERE candidate_id="${userId}" ${
    type ? `AND type="${type}"` : ""
  }`;
export const getSubmissions = async (userId: string, type?: string) => {
  const mysql = await mysqlConnection();
  const [submissionLists] = await mysql.query(
    getSubmissionsQuery(userId, type)
  );
  console.log("DB submissions lists", submissionLists);
  return submissionLists;
};
