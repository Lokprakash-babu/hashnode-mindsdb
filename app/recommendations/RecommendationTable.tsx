"use client";
import { LeaderBoard } from "../contests/Components/LeaderBoard";
import { RECOMMENDATION_TABLE_HEADERS } from "../contests/[id]/constants";

const RecommendationTable = ({ candidates }) => {
  return (
    <div className="mt-6">
      <LeaderBoard
        candidates={candidates}
        headers={RECOMMENDATION_TABLE_HEADERS}
        setCurrentCandidate={() => {}}
      />
    </div>
  );
};

export default RecommendationTable;
