"use client";
import { useState } from "react";
import { LeaderBoard } from "../contests/Components/LeaderBoard";
import { RECOMMENDATION_TABLE_HEADERS } from "../contests/[id]/constants";
import CandidatesInfoPane from "../contests/manager/CandidatesInfoPane";

const RecommendationTable = ({ candidates }) => {
  const [currentCandidate, setCurrentCandidate] = useState(
    candidates?.[0] || []
  );
  return (
    <div className="mt-6">
      <h1 className="header-2-600 mb-4">Recommended Candidates</h1>
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
