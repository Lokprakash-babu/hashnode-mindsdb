export const findUser = (userEmail) => {
  return `SELECT * FROM ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account where email='${userEmail}'`;
};
