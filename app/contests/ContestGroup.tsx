import React from "react";
import ContestCard from "./Components/ContestCard";

const ContestGroup = ({ header, contests }) => {
  if (!contests) {
    return null;
  }
  return (
    <div className="mb-10">
      <h1 className="header-1-600 mb-3 underline">{header}</h1>
      <div className="contest-card-wrapper grid grid-cols-3 gap-x-4 gap-y-8 w-full">
        {contests.map((contestDetail, index) => {
          return <ContestCard contest={contestDetail} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ContestGroup;
