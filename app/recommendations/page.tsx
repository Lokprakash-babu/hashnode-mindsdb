import { requestWrapper } from "@/lib/requestWrapper";
import HeaderSetter from "../Components/Header/HeaderSetter";
import RecommendationTable from "./RecommendationTable";

const page = async () => {
  const recommendations = await requestWrapper("/recommendations", {
    cache: "no-store",
  });
  console.log("Recom", recommendations);
  return (
    <>
      <HeaderSetter title={"Recommendations"} />
      <section className="layout">
        <RecommendationTable candidates={recommendations}/>
      </section>
    </>
  );
};

export default page;
