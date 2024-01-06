import { mysqlConnection } from "@/lib/mysql-connection";

const getAccountDetailsQuery = (accountId, params?: string[]) => {
  return `SELECT ${params?.length ? params?.join(",") : "*"} from ${
    process.env.NEXT_PLANETSCALE_DB_NAME
  }.Account WHERE id="${accountId}"`;
};
export const getAccountDetails = async (
  accountId: string,
  params?: string[]
) => {
  const mysql = await mysqlConnection();
  const [accountDetails] = await mysql.query(
    getAccountDetailsQuery(accountId, params)
  );
  return accountDetails[0];
};
