// This route will apply both for candidates and hiring managers

import ContestList from "./ContestList";
import CandidateContestList from "./CandidateContestList";

// This page contains list of contests that is associated to an account.
const Contests = async () => {
  //TODO: fetch account type from user context
  const accountType = "user";

  switch (accountType) {
    case "user":
      return <CandidateContestList />;
    default:
      return <ContestList />;
  }
};

export default Contests;
