import { mysqlConnection } from "@/lib/mysql-connection";
import moment from "moment";

const getContestsQuery = (orgId?: string) =>
  `SELECT * FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Contest ${
    orgId ? `WHERE organisation_id="${orgId}"` : ""
  }`;
export const getContestListHandler = async (orgId?: string) => {
  const mysql = await mysqlConnection();
  const [contestLists] = await mysql.query(getContestsQuery(orgId));
  console.log("DB Contest lists", contestLists);
  const today = moment().unix();
  //@ts-ignore
  const statusAddedContests = contestLists.map((contest) => {
    const contestEndDate = contest.end_date;
    const contestStartDate = contest.start_date;
    const isContestEnded = today > contestEndDate;
    const isContestInProgress =
      contestStartDate <= today && contestEndDate > today;
    if (isContestEnded) {
      return {
        ...contest,
        status: "completed",
      };
    } else if (isContestInProgress) {
      return {
        ...contest,
        status: "in-progress",
      };
    } else {
      return {
        ...contest,
        status: "upcoming",
      };
    }
  });
  return statusAddedContests;
};
