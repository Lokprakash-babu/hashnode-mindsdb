export const generateInsertQuery = (table, columns, values) => {
  return `INSERT INTO ${process.env.DB_NAME}.${table} (${columns.join(
    ","
  )}) values (${values.map((item) => `'${item}'`).join(", ")}); `;
};

export const generateUpdateQuery = (table, updateData, id) => {
  const columnsToUpdate = Object.keys(updateData)
    .map((key) => `${key} = '${updateData[key]}'`)
    .join(", ");

  return `UPDATE ${process.env.DB_NAME}.${table} SET ${columnsToUpdate} WHERE id = '${id}';`;
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
