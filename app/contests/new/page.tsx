import React from "react";
import CreateContest from "./CreateContest";
import HeaderSetter from "@/app/Components/Header/HeaderSetter";
const NewContest = () => {
  return (
    <div className="bg-white">
      <HeaderSetter title={"Create a Contest"} />
      <CreateContest />
    </div>
  );
};

export default NewContest;
