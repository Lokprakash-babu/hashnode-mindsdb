"use client";

import Markdown from "react-markdown";
import { useContestDetailsContext } from "./ContestDetailsContext";
import { removeHtmlTags } from "@/app/utils/sanitizeMarkdown";

const ContestProblemDescription = () => {
  const { currentSelectedQuestion, questions } = useContestDetailsContext();
  const questionDetails = questions[currentSelectedQuestion];

  return (
    <div>
      <Markdown>{removeHtmlTags(questionDetails.content)}</Markdown>
    </div>
  );
};

export default ContestProblemDescription;
