// This route will apply both for candidates and hiring managers

import { requestWrapper } from "@/lib/requestWrapper";
import ContestList from "./ContestList";

// This page contains list of contests that is associated to an account.
const Contests = async () => {
  // ! Note this has to removed with user context data
  const contestLists = (await requestWrapper("contest?organisation_id=1")) || {
    rows: [],
  };
  return (
    <div className="contest-list-wrapper bg-white">
      <ContestList contests={contestLists.rows} />
    </div>
  );
};

export default Contests;
