import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import ContestCard from "./Components/ContestCard";

const CandidateContestList = async () => {
  try {
    const contestList = await requestWrapper("/contest/candidates");
    const contests = contestList.message;
    return (
      <div className="contest-card-wrapper grid grid-cols-3 gap-x-4 gap-y-8 w-full py-8 ">
        {contests.map((contest, index) => (
          <ContestCard contest={contest} key={index} />
        ))}
      </div>
    );
  } catch (err) {
    console.log("error in candidate contest listing page", err);
    return notFound();
  }
};

export default CandidateContestList;
