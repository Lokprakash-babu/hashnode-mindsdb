import LinkButton from "../Components/Buttons/LinkButton";
import PlusIcon from "../Components/Icons/PlusIcon";
const ContestList = () => {
  return (
    <div>
      <LinkButton
        target="/contests/new"
        ctaLabel="Create Contest"
        anchorIcon={<PlusIcon />}
      />
    </div>
  );
};

export default ContestList;
