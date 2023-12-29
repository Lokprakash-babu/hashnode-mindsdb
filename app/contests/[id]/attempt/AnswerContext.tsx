"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AnswerContext = createContext({
  answers: {},
  setAnswer: (index) => {},
});

export const useAnswerContext = () => {
  const contextValues = useContext(AnswerContext);
  return {
    ...contextValues,
  };
};
const AnswerContextProvider = ({ children }) => {
  const [answer, setAnswer] = useState({});
  console.log("answer context", answer);

  return (
    <AnswerContext.Provider
      value={{
        answers: answer,
        setAnswer,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export default AnswerContextProvider;
