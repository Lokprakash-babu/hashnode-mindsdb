// This route will apply both for candidates and hiring managers

import ContestList from "./ContestList";
import CandidateContestList from "./CandidateContestList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HeaderSetter from "../Components/Header/HeaderSetter";

// This page contains list of contests that is associated to an account.
const Contests = async () => {
  //TODO: fetch account type from user context
  const accountType = "user";
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");

  switch (accountType) {
    case "user":
      return (
        <section className="layout">
          <HeaderSetter title={"Contests"} />
          <CandidateContestList />
        </section>
      );
    default:
      return (
        <section className="layout">
          <HeaderSetter title={"Contests"} />
          <ContestList />
        </section>
      );
  }
};

export default Contests;
