"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { useContestDetailsContext } from "./ContestDetailsContext";

const ContestHeader = () => {
  const { questionKeys, setCurrentSelectedQuestion, currentSelectedQuestion } =
    useContestDetailsContext();

  return (
    <Tabs
      size={"sm"}
      aria-label="Questions Tab"
      selectedKey={currentSelectedQuestion}
      onSelectionChange={setCurrentSelectedQuestion}
      className="mb-4"
    >
      {questionKeys.map((question, idx) => {
        return <Tab key={question} title={`Question ${idx + 1}`}></Tab>;
      })}
    </Tabs>
  );
};

export default ContestHeader;
