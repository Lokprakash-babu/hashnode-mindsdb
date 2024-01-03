import { mysqlConnection } from "@/lib/mysql-connection";

const getContestsQuery = (orgId?: string) =>
  `SELECT * FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Contest ${
    orgId ? `WHERE organisation_id="${orgId}"` : ""
  }`;
export const getContestListHandler = async (orgId?: string) => {
  const mysql = await mysqlConnection();
  const [contestLists] = await mysql.query(getContestsQuery(orgId));
  console.log("DB Contest lists", contestLists);
  return contestLists;
};
