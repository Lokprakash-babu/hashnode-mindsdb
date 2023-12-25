import LinkButton from "../Components/Buttons/LinkButton";
import PlusIcon from "../Components/Icons/PlusIcon";
import ContestCard from "./Components/ContestCard";
const ContestList = ({ contests }) => {
  return (
    <div>
      <div className="contest-list-header py-4 border flex justify-between pr-[84px] items-center w-full">
        <h2 className="header-1-500 text-black pl-8">Contest Lists</h2>
        <LinkButton
          target="/contests/new"
          ctaLabel="Create Contest"
          anchorIcon={<PlusIcon />}
        />
      </div>
      <div className="contest-card-wrapper grid grid-cols-3 gap-x-4 gap-y-8 w-full p-8">
        {contests.map((contest, index) => (
          <ContestCard contest={contest} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ContestList;
