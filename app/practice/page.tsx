import HeaderSetter from "../Components/Header/HeaderSetter";
import PracticeListing from "./PracticeListing";

const Practice = () => {
  return (
    <section className="layout">
      <HeaderSetter title="Practice" />
      <PracticeListing />
    </section>
  );
};

export default Practice;
