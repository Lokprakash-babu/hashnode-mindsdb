"use client";
import { createContext, useContext, useState } from "react";

const ContestDetailsContext = createContext({
  Id: "",
  title: "",
  description: "",
  start_date: "",
  end_date: "",
  questions: {
    question_1703771266602: {
      type: "",
      title: "",
      content: "",
    },
    question_1703771314475: {
      tone: "",
      type: "",
      title: "",
      content: "",
      initial_text: "",
    },
  },
  organisation_id: "1",
  job_description: "",
  role: "",
  currentSelectedQuestion: "",
  questionKeys: [""],
  setCurrentSelectedQuestion: (index) => null,
});

export const useContestDetailsContext = () => {
  const params = useContext(ContestDetailsContext);
  return {
    ...params,
  };
};
const ContestDetailsProvider = ({ contestDetails, children }) => {
  const [currentSelectedQuestion, setCurrentSelectedQuestion] =
    useState<string>(Object.keys(contestDetails.questions)[0]);
  const questionKeys = Object.keys(contestDetails.questions);

  return (
    <ContestDetailsContext.Provider
      value={{
        ...contestDetails,
        currentSelectedQuestion,
        setCurrentSelectedQuestion,
        questionKeys,
      }}
    >
      {children}
    </ContestDetailsContext.Provider>
  );
};

export default ContestDetailsProvider;
