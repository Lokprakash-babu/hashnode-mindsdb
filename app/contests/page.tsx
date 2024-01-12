import HeaderSetter from "../Components/Header/HeaderSetter";
import { auth } from "@clerk/nextjs";
import { getAccountDetails } from "../db-handlers/accounts/getAccountDetails";
import { notFound } from "next/navigation";
import { getContestListHandler } from "../db-handlers/contests/getContests";
import LinkButton from "../Components/Buttons/LinkButton";
import PlusIcon from "../Components/Icons/PlusIcon";
import ContestCard from "./Components/ContestCard";
import ContestGroup from "./ContestGroup";

const Contests = async () => {
  try {
    const { userId } = auth();
    const accountDetails = await getAccountDetails(userId || "");
    const userPersona = accountDetails.account_type;

    if (!userPersona) {
      throw new Error("Account details not available");
    }

    if (userPersona === "candidate") {
      //Fetch all the contests
      const contests = (await getContestListHandler()) as [];
      const groupingBasedContest = contests.reduce((prev, curr) => {
        //@ts-ignore
        const currentStatus = curr.status;
        if (prev[currentStatus]) {
          prev[currentStatus].push(curr);
        } else {
          prev[currentStatus] = [curr];
        }
        return {
          ...prev,
        };
      }, {});
      return (
        <section className="layout mt-8">
          <HeaderSetter title={"Contests"} />

          <ContestGroup
            header={"On Going contests"}
            contests={groupingBasedContest["in-progress"]}
          />
          <ContestGroup
            header={"Upcoming contests"}
            contests={groupingBasedContest["upcoming"]}
          />
          <ContestGroup
            header={"Ended contests"}
            contests={groupingBasedContest["completed"]}
          />
        </section>
      );
    }
    const orgId = accountDetails?.organisation_id;
    const contests = (await getContestListHandler(orgId || "")) as [];
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
