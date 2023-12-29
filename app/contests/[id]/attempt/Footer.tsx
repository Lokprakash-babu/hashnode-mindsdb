"use client";
import { Button } from "@nextui-org/react";
import { useContestDetailsContext } from "./ContestDetailsContext";
import { useAnswerContext } from "./AnswerContext";

const Footer = () => {
  const { currentSelectedQuestion, questionKeys, setCurrentSelectedQuestion } =
    useContestDetailsContext();
  const { onSaveHandler, onContestEndHandler } = useAnswerContext();
  const questionIndex = questionKeys.findIndex(
    (keys) => keys === currentSelectedQuestion
  );
  const totalNoOfQuestions = questionKeys.length;
  const isSaveAndNext = questionIndex < totalNoOfQuestions - 1;
  return (
    <div className="flex justify-between">
      <Button
        isDisabled={questionIndex === 0}
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSelectedQuestion(questionKeys[questionIndex - 1]);
        }}
      >
        Previous
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          if (isSaveAndNext) {
            onSaveHandler();
            setCurrentSelectedQuestion(questionKeys[questionIndex + 1]);
          } else {
            //Trigger submit call
            onContestEndHandler();
          }
        }}
      >
        {!isSaveAndNext ? "Submit" : "Save & Next"}
      </Button>
    </div>
  );
};

export default Footer;
