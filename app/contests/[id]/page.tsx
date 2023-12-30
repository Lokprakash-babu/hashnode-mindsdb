import { requestWrapper } from "@/lib/requestWrapper";
import ContestDetails from "../manager/ContestDetails";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ContestDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
  const contestDetail = await requestWrapper(`/contest/${params.id}`, {
    cache: "no-store",
  });
  return (
    <div className="contest-details-wrapper bg-white">
      <ContestDetails details={contestDetail.data[0]} />
    </div>
  );
};

export default ContestDetailsPage;
