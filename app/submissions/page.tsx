import { requestWrapper } from "@/lib/requestWrapper";
import { notFound, redirect } from "next/navigation";
import SubmissionList from "./SubmissionListing";
import { getServerSession } from "next-auth";

const SubmissionListing = async () => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
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
