import { mysqlConnection } from "@/lib/mysql-connection";
import { auth } from "@clerk/nextjs";

const getSubmissionDetailsQuery = (userId, submissionId: string) => {
  return `SELECT 
    ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.id, 
    ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.entity_id, 
    ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.type, 
    ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.answer,
    ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.score, 
    ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.feedback
  FROM 
    ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission
  JOIN 
    ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback ON ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.id = ${process.env.NEXT_PLANETSCALE_DB_NAME}.Feedback.submission_id
  WHERE 
    ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.id = "${submissionId}" AND ${process.env.NEXT_PLANETSCALE_DB_NAME}.Submission.candidate_id="${userId}";`;
};

export const getSubmissionDetails = async (submissionId: string) => {
  const { userId } = auth();
  const mysql = await mysqlConnection();
  const [submissionDetail] = await mysql.query(
    getSubmissionDetailsQuery(userId, submissionId)
  );
  console.log("DB submissions Details", submissionDetail);
  return submissionDetail?.[0];
};
