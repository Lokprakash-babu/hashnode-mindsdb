import { practiceDetails } from "@/app/constants/practice";
import { notFound, redirect } from "next/navigation";
import PracticeDescription from "./PracticeDescription";
import PracticeSolution from "./PracticeSolution";
import { getServerSession } from "next-auth";

const PracticeDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
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
