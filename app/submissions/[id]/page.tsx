import { requestWrapper } from "@/lib/requestWrapper";
import { notFound, redirect } from "next/navigation";
import SubmissionDetails from "./SubmissionDetails";
import { getServerSession } from "next-auth";

const PracticeDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
  try {
    const getSubmissionDetails = await requestWrapper(
      `/submissions/${params.id}`
    );
    const submissionDetails = getSubmissionDetails.message;
    const { language_proficiency, overall_feedback, tone_feedback, score } =
      JSON.parse(submissionDetails.feedback);
    return (
      <SubmissionDetails
        languageFeedback={language_proficiency}
        overallFeedback={overall_feedback}
        toneFeedback={tone_feedback}
        problemId={submissionDetails.entity_id}
        answer={submissionDetails.answer}
        score={score}
      />
    );
  } catch (err) {
    return notFound();
  }
};

export default PracticeDetailsPage;
