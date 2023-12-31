import { practiceDetails } from "@/app/constants/practice";
import { notFound, redirect } from "next/navigation";
import PracticeDescription from "./PracticeDescription";
import PracticeSolution from "./PracticeSolution";

import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import SubHeader from "@/app/Components/SubHeader";
import BreadCrumb from "@/app/Components/BreadCrumb";
import clsx from "clsx";

const PracticeDetailsPage = async ({ params }: { params: { id: string } }) => {
  const practiceDetailsContent = practiceDetails[params.id];
  if (!practiceDetailsContent) {
    return notFound();
  }
  const crumbs = [
    {
      label: "Practice",
      href: "/practice",
    },
    {
      label: params.id,
      href: `/practice/${params.id}`,
    },
  ];
  return (
    <>
      <HeaderSetter title={`Practice: ${params.id}`} />
      <SubHeader>
        <BreadCrumb crumbs={crumbs} />
      </SubHeader>
      <section className={clsx("layout", "flex justify-between gap-10")}>
        <article className={clsx("flex-1")}>
          <PracticeDescription {...practiceDetailsContent} />
        </article>
        <article className={clsx("flex-1")}>
          <PracticeSolution
            {...practiceDetailsContent}
            practiceId={params.id}
          />
        </article>
      </section>
    </>
  );
};

export default PracticeDetailsPage;
