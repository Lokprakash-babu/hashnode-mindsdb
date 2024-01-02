import HeaderSetter from "../Components/Header/HeaderSetter";
import { auth } from "@clerk/nextjs";
import { getAccountDetails } from "../db-handlers/accounts/getAccountDetails";
import { notFound } from "next/navigation";
import { getContestListHandler } from "../db-handlers/contests/getContests";
import LinkButton from "../Components/Buttons/LinkButton";
import PlusIcon from "../Components/Icons/PlusIcon";
import ContestCard from "./Components/ContestCard";
import { getUserPersona } from "../utils/getUserPersona";

const Contests = async () => {
  try {
    const { userId } = auth();
    const userPersona = await getUserPersona();
    if (!userPersona) {
      throw new Error("Account details not available");
    }

    if (userPersona === "candidate") {
      //Fetch all the contests
      const contests = (await getContestListHandler()) as [];
      return (
        <section className="layout">
          <HeaderSetter title={"Contests"} />
          <div className="contest-card-wrapper grid grid-cols-3 gap-x-4 gap-y-8 w-full py-8">
            {contests.map((contestDetail, index) => {
              console.log("CONTEST", contestDetail);
              return <ContestCard contest={contestDetail} key={index} />;
            })}
          </div>
        </section>
      );
    }
    const contests = (await getContestListHandler(userId || "")) as [];
    return (
      <section className="layout">
        <HeaderSetter title={"Contests"} />

        <div>
          <div className="contest-list-header py-4 border flex justify-between pr-[84px] items-center w-full">
            <h2 className="header-1-500 text-black pl-8">Contest Lists</h2>
            <LinkButton
              target="/contests/new"
              ctaLabel="Create Contest"
              anchorIcon={<PlusIcon />}
            />
          </div>
          <div className="contest-card-wrapper grid grid-cols-3 gap-x-4 gap-y-8 w-full py-8">
            {contests.map((contest, index) => (
              <ContestCard contest={contest} key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (err) {
    console.log("Error in contest listing page", err);
    return notFound();
  }
};

export default Contests;
