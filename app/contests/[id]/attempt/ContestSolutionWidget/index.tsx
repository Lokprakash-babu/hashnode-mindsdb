"use client";
import { useAnswerContext } from "../AnswerContext";
import { useContestDetailsContext } from "../ContestDetailsContext";
import ChatSolutionWidget from "./ChatSolutionWidget";
import EmailSolutionWidget from "./EmailSolutionWidget";

const ContestSolutionWidget = () => {
  const { currentSelectedQuestion, questions } = useContestDetailsContext();
  const { setAnswer } = useAnswerContext();
  const questionDetails = questions[currentSelectedQuestion];
  const questionType = questionDetails.type;
  const onChangeOfAnswer = (currentState) => {
    setAnswer((currentAnswerState) => {
      return {
        ...currentAnswerState,
        [currentSelectedQuestion]: {
          value: currentState,
        },
      };
    });
  };
  switch (questionType) {
    case "email":
      return (
        <EmailSolutionWidget
          onChange={onChangeOfAnswer}
          questionKey={currentSelectedQuestion}
        />
      );
    default:
      return (
        <ChatSolutionWidget
          questionDetails={questionDetails}
          onChange={onChangeOfAnswer}
          questionKey={currentSelectedQuestion}
        />
      );
  }
};

export default ContestSolutionWidget;
