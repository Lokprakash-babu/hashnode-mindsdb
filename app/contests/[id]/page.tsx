import { requestWrapper } from "@/lib/requestWrapper";
import ContestDetails from "./ContestDetails";
export const dynamic = "force-dynamic";
const ContestDetailsPage = async ({ params }: { params: { id: string } }) => {
  const contestDetail = await requestWrapper(`/contest/${params.id}`);
  return (
    <div className="contest-details-wrapper bg-white">
      <ContestDetails details={contestDetail.data[0]} />
    </div>
  );
};

export default ContestDetailsPage;
