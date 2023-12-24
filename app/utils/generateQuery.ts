export const generateInsertQuery = (table, columns, values) => {
  return `INSERT INTO ${process.env.DB_NAME}.${table} (${columns.join(
    ","
  )}) values (${values.map((item) => `'${item}'`).join(", ")}); `;
};
