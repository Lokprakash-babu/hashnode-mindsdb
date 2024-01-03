import HeaderSetter from "../Components/Header/HeaderSetter";
import SubmissionListingTab from "./SubmissionListingTabs";

const Submissions = async () => {
  return (
    <section>
      <HeaderSetter title={"Submissions"} />
      <div className="layout">
        <SubmissionListingTab />
      </div>
    </section>
  );
};

export default Submissions;
