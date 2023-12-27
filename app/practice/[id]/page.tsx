import { practiceDetails } from "@/app/constants/practice";
import { notFound } from "next/navigation";
import PracticeDescription from "./PracticeDescription";
import PracticeSolution from "./PracticeSolution";

const PracticeDetailsPage = async ({ params }: { params: { id: string } }) => {
  const practiceDetailsContent = practiceDetails[params.id];
  if (!practiceDetailsContent) {
    return notFound();
  }
  return (
    <>
      <PracticeDescription {...practiceDetailsContent} />
      <PracticeSolution {...practiceDetailsContent} practiceId={params.id} />
    </>
  );
};

export default PracticeDetailsPage;
