import { requestWrapper } from "@/lib/requestWrapper";
import ContestDetails from "../manager/ContestDetails";

const ContestDetailsPage = async ({ params }: { params: { id: string } }) => {
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
