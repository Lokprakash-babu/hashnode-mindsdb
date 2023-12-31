import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import SubmissionDetails from "./SubmissionDetails";

import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import SubHeader from "@/app/Components/SubHeader";
import BreadCrumb from "@/app/Components/BreadCrumb";

const PracticeDetailsPage = async ({ params }: { params: { id: string } }) => {
  try {
    const getSubmissionDetails = await requestWrapper(
      `/submissions/${params.id}`
    );
    const submissionDetails = getSubmissionDetails.message;
    const { language_proficiency, overall_feedback, tone_feedback, score } =
      JSON.parse(submissionDetails.feedback);
    const crumbs = [
      {
        label: "Submissions",
        href: "/submissions",
      },
      {
        label: params.id,
        href: `/submissions/${params.id}`,
      },
    ];
    return (
      <>
        <HeaderSetter title={`Submission: ${params.id}`} />
        <SubHeader>
          <BreadCrumb crumbs={crumbs} />
        </SubHeader>
        <section className="layout">
          <SubmissionDetails
            languageFeedback={language_proficiency}
            overallFeedback={overall_feedback}
            toneFeedback={tone_feedback}
            problemId={submissionDetails.entity_id}
            answer={submissionDetails.answer}
            score={score}
          />
        </section>
      </>
    );
  } catch (err) {
    return notFound();
  }
};

export default PracticeDetailsPage;
