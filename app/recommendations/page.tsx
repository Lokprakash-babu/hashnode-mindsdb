
import HeaderSetter from "../Components/Header/HeaderSetter";
import RecommendationTable from "./RecommendationTable";
import { getRecommendations } from "../db-handlers/recommendations/getRecommendations";

const page = async () => {
  const recommendations = await getRecommendations();
  return (
    <>
      <HeaderSetter title={"Recommendations"} />
      <section className="layout">
        <RecommendationTable candidates={recommendations} />
      </section>
    </>
  );
};

export default page;
