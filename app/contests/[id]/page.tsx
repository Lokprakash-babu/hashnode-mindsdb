import { requestWrapper } from "@/lib/requestWrapper";
import ContestDetails from "../manager/ContestDetails";

import { redirect } from "next/navigation";
import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import SubHeader from "@/app/Components/SubHeader";
import BreadCrumb from "@/app/Components/BreadCrumb";

const ContestDetailsPage = async ({ params }: { params: { id: string } }) => {
  const contestDetail = await requestWrapper(`/contest/${params.id}`, {
    cache: "no-store",
  });
  const crumbs = [
    {
      label: "Contests",
      href: "/contests",
    },
    {
      label: params.id,
      href: `/contests/${params.id}`,
    },
  ];
  return (
    <>
      <HeaderSetter title={`Contest: ${params.id}`} />
      <SubHeader>
        <BreadCrumb crumbs={crumbs} />
      </SubHeader>
      <section className="layout">
        <ContestDetails details={contestDetail.data[0]} />
      </section>
    </>
  );
};

export default ContestDetailsPage;
