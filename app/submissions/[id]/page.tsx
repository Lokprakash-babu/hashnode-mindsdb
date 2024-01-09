import { notFound } from "next/navigation";
import SubmissionDetails from "./SubmissionDetails";

import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import SubHeader from "@/app/Components/SubHeader";
import BreadCrumb from "@/app/Components/BreadCrumb";
import { getSubmissionDetails } from "@/app/db-handlers/submissions/getSubmissionDetails";
import ContestSubmissionDetails from "./ContestSubmissionDetails/ContestSubmissionDetails";

const PracticeDetailsPage = async ({ params }: { params: { id: string } }) => {
  try {
    const submissionDetails = await getSubmissionDetails(params.id);
    if (!submissionDetails) {
      return notFound();
    }
    const {
      language_proficiency,
      tone_feedback,
      scoreVal: score,
    } = submissionDetails.feedback;

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
    const isContestType = submissionDetails.type === "contest";

    return (
      <>
        <HeaderSetter title={`Submission: ${params.id}`} />
        <SubHeader>
          <BreadCrumb crumbs={crumbs} />
        </SubHeader>
        <section className="layout">
          {isContestType && (
            <ContestSubmissionDetails
              languageFeedback={language_proficiency}
              toneFeedback={tone_feedback}
              problemId={submissionDetails.entity_id}
              answer={submissionDetails.answer.answer}
              score={score}
            />
          )}
          {!isContestType && (
            <SubmissionDetails
              languageFeedback={language_proficiency}
              toneFeedback={tone_feedback}
              problemId={submissionDetails.entity_id}
              answer={submissionDetails.answer}
              score={score}
            />
          )}
        </section>
      </>
    );
  } catch (err) {
    return notFound();
  }
};

export default PracticeDetailsPage;
