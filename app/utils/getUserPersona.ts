import { auth } from "@clerk/nextjs";
import { getAccountDetails } from "../db-handlers/accounts/getAccountDetails";

export const getUserPersona = async () => {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return null;
  }
  const accountDetails = await getAccountDetails(userId || "", [
    "account_type",
  ]);
  return accountDetails.account_type;
};
