import { requestWrapper } from "@/lib/requestWrapper";
import { notFound, redirect } from "next/navigation";
import SubmissionList from "./SubmissionListing";
import { getServerSession } from "next-auth";
import HeaderSetter from "../Components/Header/HeaderSetter";

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
