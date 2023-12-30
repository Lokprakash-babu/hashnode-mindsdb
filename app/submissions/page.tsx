import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import SubmissionList from "./SubmissionListing";
import HeaderSetter from "../Components/Header/HeaderSetter";

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

    return (
      <section className="layout">
        <HeaderSetter title="Submissions" />
        <SubmissionList submissions={modifiedSubmissionList} />
      </section>
    );
  } catch (err) {
    return notFound();
  }
};

export default SubmissionListing;
