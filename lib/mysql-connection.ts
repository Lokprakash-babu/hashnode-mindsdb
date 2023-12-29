import mysql from "mysql2/promise";
// Create the connection pool. The pool-specific settings are the defaults
export const mysqlConnection = async () =>
  await mysql.createPool({
    host: process.env.NEXT_DB_HOST,
    user: process.env.NEXT_DB_USERNAME,
    password: process.env.NEXT_DB_PASSWORD,
    database: process.env.NEXT_PLANETSCALE_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: {
      // DO NOT DO THIS
      // set up your ca correctly to trust the connection
      rejectUnauthorized: false,
    },
  });
