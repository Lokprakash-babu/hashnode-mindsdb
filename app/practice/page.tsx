import { getServerSession } from "next-auth";
import HeaderSetter from "../Components/Header/HeaderSetter";
import PracticeListing from "./PracticeListing";
import { redirect } from "next/navigation";

const Practice = async () => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");

  return (
    <section className="layout">
      <HeaderSetter title="Practice" />
      <PracticeListing />
    </section>
  );
};

export default Practice;
