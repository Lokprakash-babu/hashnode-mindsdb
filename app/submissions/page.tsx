import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import SubmissionList from "./SubmissionListing";

const SubmissionListing = async () => {
  try {
    const submissionList = await requestWrapper("/submission");
    const modifiedSubmissionList =
      submissionList?.message?.map((submission) => {
        return {
          submission_id: submission.id,
          problem_id: submission.entity_id,
          score: submission.score,
          feedback: submission.feedback,
        };
      }) || [];

    return <SubmissionList submissions={modifiedSubmissionList} />;
  } catch (err) {
    return notFound();
  }
};

export default SubmissionListing;