export const findUser = (userEmail, key = "email") => {
  return `SELECT * FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account where ${key}='${userEmail}'`;
};
