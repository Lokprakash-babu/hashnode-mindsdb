import HeaderSetter from "../Components/Header/HeaderSetter";
import PracticeListing from "./PracticeListing";
import { redirect } from "next/navigation";

const Practice = async () => {
  return (
    <section className="layout">
      <HeaderSetter title="Practice" />
      <PracticeListing />
    </section>
  );
};

export default Practice;
