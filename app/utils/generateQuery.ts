export const generateInsertQuery = (table, columns, values) => {
  return `INSERT INTO ${process.env.DB_NAME}.${table} (${columns.join(
    ","
  )}) values (${values.map((item) => `'${item}'`).join(", ")}); `;
};

export const selectAllQuery = (table, whereClause) => {
  const query = `Select * from ${process.env.DB_NAME}.${table}`;
  return whereClause ? query + ` ${whereClause}` : query;
};
