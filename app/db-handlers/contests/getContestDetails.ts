import { mysqlConnection } from "@/lib/mysql-connection";
import moment from "moment";

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
    const today = moment().unix();

    const contestEndDate = contestDetails?.[0]?.end_date;
    const contestStartDate = contestDetails?.[0]?.start_date;
    const isContestEnded = today > contestEndDate;
    const isContestInProgress =
      contestStartDate <= today && contestEndDate > today;
    const status = isContestEnded
      ? "completed"
      : isContestInProgress
      ? "in-progress"
      : "upcoming";
    return {
      ...contestDetails[0],
      status,
    };
  }
  return {};
};
