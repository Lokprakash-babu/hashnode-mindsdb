export const generateInsertQuery = (table, columns, values, dbName = "") => {
  return `INSERT INTO ${dbName || process.env.DB_NAME}.${table} (${columns.join(
    ","
  )}) values (${values
    .map((item) => {
      const data = typeof item === "object" ? JSON.stringify(item) : item;
      return `'${data}'`;
    })
    .join(", ")}); `;
};

export const generateUpdateQuery = (table, updateData, id, dbName = "") => {
  const columnsToUpdate = Object.keys(updateData)
    .map((key) => `${key} = '${updateData[key]}'`)
    .join(", ");

  return `UPDATE ${
    dbName || process.env.DB_NAME
  }.${table} SET ${columnsToUpdate} WHERE id = '${id}';`;
};
export const selectAllQuery = (
  table,
  whereCondition,
  dbName = process.env.DB_NAME,
  limit = 10
) => {
  const query = `Select * from ${dbName}.${table}`;
  return whereCondition
    ? query + ` where ${whereCondition} limit ${limit}`
    : query;
};
