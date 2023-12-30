import { getServerSession } from "next-auth";
import PracticeListing from "./PracticeListing";
import { redirect } from "next/navigation";

const Practice = async () => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
  return <PracticeListing />;
};

export default Practice;
