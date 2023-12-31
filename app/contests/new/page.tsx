import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import CreateContest from "./CreateContest";
import { redirect } from "next/navigation";
const NewContest = async () => {
  return (
    <div className="bg-white">
      <HeaderSetter title={"Create a Contest"} />
      <CreateContest />
    </div>
  );
};

export default NewContest;
