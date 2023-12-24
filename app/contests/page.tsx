// This route will apply both for candidates and hiring managers

import ContestList from "./ContestList";

// This page contains list of contests that is associated to an account.
const Contests = () => {
  return (
    <div className="contest-list-wrapper bg-white">
      <ContestList />
    </div>
  );
};

export default Contests;
