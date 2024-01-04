import { mysqlConnection } from "@/lib/mysql-connection";
import { auth } from "@clerk/nextjs";
import moment from "moment";

const db = process.env.NEXT_PLANETSCALE_DB_NAME;
const fetchSubmissionRecord = (candidateId, contestId) => {
  return `SELECT id from ${db}.Submission WHERE candidate_id="${candidateId}" AND entity_id="${contestId}"`;
};

const createSubmissionRecord = (candidateId, contestId, submissionId) => {
  return `
    INSERT INTO ${db}.Submission (candidate_id, entity_id, id, type) VALUES ("${candidateId}", "${contestId}", "${submissionId}", "contest");
    `;
};

const fetchFeedbackRecord = (candidateId, submissionId) => {
  return `SELECT start_time_candidate, end_time_candidate, feedback from ${db}.Feedback WHERE candidate_id="${candidateId}" AND submission_id="${submissionId}"`;
};

const fetchContestDetails = (contestId) => {
  return `SELECT * from ${db}.Contest WHERE Id="${contestId}"`;
};
const createFeedbackRecord = (
  candidateId,
  contestId,
  submissionId,
  start_time,
  end_time
) => {
  return `
    INSERT INTO ${db}.Feedback (candidate_id, entity_id, submission_id, start_time_candidate, end_time_candidate) VALUES ("${candidateId}", "${contestId}", "${submissionId}", "${start_time}", "${end_time}");
    `;
};

export const startContest = async (contestId) => {
  const mysql = await mysqlConnection();
  try {
    const { userId } = auth();

    console.log("USER ID", userId);
    const [contestDetails] = await mysql.query(fetchContestDetails(contestId));
    if (Array(contestDetails).length === 0) {
      return {
        message: "Contest not found",
      };
    }
    const [submissionRecordData] = await mysql.query(
      fetchSubmissionRecord(userId, contestId)
    );
    const submissionId = submissionRecordData?.[0]?.id;
    if (submissionId) {
      //Fetch the start time
      const [feedbackRecord] = await mysql.query(
        fetchFeedbackRecord(userId, submissionId)
      );

      const startTime = feedbackRecord[0].start_time_candidate;
      const endTime = feedbackRecord[0].end_time_candidate;
      const feedback = feedbackRecord[0].feedback;
      const contestEndTime = contestDetails[0].end_date;
      console.log(">>> contest details", contestDetails);
      const currentTime = moment().unix();

      const isContestEnded = currentTime >= contestEndTime;
      const isUserCrossedTheTimeLimit = currentTime >= endTime;
      console.log("contest time", currentTime, contestEndTime, feedback);
      console.log(
        "conditions",
        !feedback,
        !isContestEnded,
        !isUserCrossedTheTimeLimit,
        !feedback || !isContestEnded || !isUserCrossedTheTimeLimit
      );
      //If feedback is available, user already ended the contest
      //If feedback is not available, check if the contest end date is < current time -> contest expiry.
      //If endTime of candidate is lesser than current time, which means user exceeded the time limit/time over.
      if (feedback || isContestEnded || isUserCrossedTheTimeLimit) {
        return {
          message: "Contest is done already!",
        };
      } else {
        return {
          message: {
            startTime,
            endTime,
            contestDetails: {
              ...contestDetails[0],
            },
          },
        };
      }
    } else {
      //Create submission record
      const toBeGeneratedSubmissionId = `submission_${Date.now()}`;
      console.log("contest details else block", contestDetails);
      await mysql.query(
        createSubmissionRecord(userId, contestId, toBeGeneratedSubmissionId)
      );
      //Create an entry in the feedback table.
      const currentTime = moment().unix();
      const endTime = moment().add(30, "minutes").unix();
      await mysql.query(
        createFeedbackRecord(
          userId,
          contestId,
          toBeGeneratedSubmissionId,
          currentTime,
          endTime
        )
      );

      return {
        message: {
          startTime: currentTime,
          endTime,
          contestDetails: { ...contestDetails[0] },
        },
      };
    }
  } catch (err) {
    console.log("err in start contest", err);
    await mysql.query("ROLLBACK");
    return { message: "Internal error" };
  }
};
