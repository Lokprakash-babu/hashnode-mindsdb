"use client";

import { Tab, Tabs } from "@nextui-org/react";
import ResponsePreview from "./ResponsePreview";

const QuestionsTab = ({ questions }) => {
  return (
    <Tabs>
      {Object.keys(questions).map((question, idx) => {
        return (
          <Tab key={question} title={`Response ${idx + 1}`}>
            <ResponsePreview value={questions[question]?.value} />
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default QuestionsTab;
