"use client";
import { useState } from "react";
import Button from "@/app/Components/Buttons";
import { LeaderBoard } from "../contests/Components/LeaderBoard";
import { RECOMMENDATION_TABLE_HEADERS } from "../contests/[id]/constants";
import CandidatesInfoPane from "../contests/manager/CandidatesInfoPane";
import { requestWrapper } from "@/lib/requestWrapper";

const RecommendationTable = ({ candidates }) => {
  const [currentCandidate, setCurrentCandidate] = useState(
    candidates?.[0] || []
  );
  const refreshRecommendations = () => {
    console.log("Rfresh");
    requestWrapper("/recommendations/refresh", {
      method: "POST",
    }).then(() => {
      window?.location?.reload();
    });
  };
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="header-2-600">Recommended Candidates</h1>
        <Button onClick={refreshRecommendations} color="primary">
          Get Latest Recommendations
        </Button>
      </div>
      <div className="flex gap-x-4">
        <LeaderBoard
          candidates={candidates}
          headers={RECOMMENDATION_TABLE_HEADERS}
          setCurrentCandidate={setCurrentCandidate}
        />
        <CandidatesInfoPane candidate={currentCandidate} />
      </div>
    </div>
  );
};

export default RecommendationTable;
