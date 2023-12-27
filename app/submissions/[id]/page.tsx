import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import SubmissionDetails from "./SubmissionDetails";

const PracticeDetailsPage = async ({ params }: { params: { id: string } }) => {
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
