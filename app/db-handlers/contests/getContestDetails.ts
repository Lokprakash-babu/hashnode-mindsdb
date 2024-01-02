import { mysqlConnection } from "@/lib/mysql-connection";

const getContestDetailsQuery = (contestId, params?: string[]) => {
  return `SELECT ${params?.length ? params.join(",") : "*"} from ${
    process.env.NEXT_PLANETSCALE_DB_NAME
  }.Contest WHERE id="${contestId}"`;
};
export const getContestDetails = async (
  contestId: string,
  accountId: string,
  accountType: string,
  params?: string[]
) => {
  const mysql = await mysqlConnection();
  const [contestDetails] = await mysql.query(
    getContestDetailsQuery(contestId, params)
  );
  if (
    accountType === "candidate" ||
    contestDetails?.[0]?.created_by === accountId
  ) {
    return contestDetails[0];
  }
  return {};
};
