import { getServerSession } from "next-auth";
import CreateContest from "./CreateContest";
import { redirect } from "next/navigation";
const NewContest = async () => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");

  return (
    <div className="bg-white">
      <HeaderSetter title={"Create a Contest"} />
      <CreateContest />
    </div>
  );
};

export default NewContest;
