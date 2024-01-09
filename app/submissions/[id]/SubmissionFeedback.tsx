"use client";
import { Tabs, Tab } from "@nextui-org/react";

const SubmissionFeedback = ({ languageFeedback, toneFeedback }) => {
  return (
    <Tabs aria-label="Feedback">
      <Tab title="Language Feedback">
        <p className="text-md">{languageFeedback}</p>
      </Tab>
      <Tab title="Tone feedback">
        <p className="text-md">{toneFeedback}</p>
      </Tab>
    </Tabs>
  );
};

export default SubmissionFeedback;
