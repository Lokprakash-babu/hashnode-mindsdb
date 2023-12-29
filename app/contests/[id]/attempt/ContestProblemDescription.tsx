"use client";

import Markdown from "react-markdown";
import { useContestDetailsContext } from "./ContestDetailsContext";

const ContestProblemDescription = () => {
  const { currentSelectedQuestion, questions } = useContestDetailsContext();
  const questionDetails = questions[currentSelectedQuestion];

  return (
    <div>
      <Markdown>{questionDetails.content}</Markdown>
    </div>
  );
};

export default ContestProblemDescription;
