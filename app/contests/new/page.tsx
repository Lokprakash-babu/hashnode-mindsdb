import { getServerSession } from "next-auth";
import CreateContest from "./CreateContest";
import { redirect } from "next/navigation";
const NewContest = async () => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
  return (
    <div className="bg-white">
      <CreateContest />
    </div>
  );
};

export default NewContest;
