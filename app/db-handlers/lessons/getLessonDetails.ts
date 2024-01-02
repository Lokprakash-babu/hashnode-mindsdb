import { mysqlConnection } from "@/lib/mysql-connection";

const getLessonDetailsQuery = (lessonId) =>
  `SELECT * from ${process.env.NEXT_PLANETSCALE_DB_NAME}.lesson_chapter_map WHERE lesson_id="${lessonId}" ORDER BY chapter_order`;
export const getLessonDetails = async (lessonId: string) => {
  const mysql = await mysqlConnection();
  const [lessonDetails] = await mysql.query(getLessonDetailsQuery(lessonId));
  return lessonDetails[0];
};
