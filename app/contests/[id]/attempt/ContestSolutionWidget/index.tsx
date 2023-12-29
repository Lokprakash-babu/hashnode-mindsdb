"use client";
import { useContestDetailsContext } from "../ContestDetailsContext";
import EmailSolutionWidget from "./EmailSolutionWidget";

const ContestSolutionWidget = () => {
  const { currentSelectedQuestion, questions } = useContestDetailsContext();
  const questionDetails = questions[currentSelectedQuestion];
  const questionType = questionDetails.type;
  switch (questionType) {
    case "email":
      return <EmailSolutionWidget questionDetails={questionDetails} />;
  }
  return <div>ContestSolutionWidget</div>;
};

export default ContestSolutionWidget;
