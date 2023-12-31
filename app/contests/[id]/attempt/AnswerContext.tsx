"use client";
import Toast from "@/app/Components/Toasts/Toast";
import { requestWrapper } from "@/lib/requestWrapper";
import { useParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AnswerContext = createContext({
  answers: {},
  setAnswer: (index) => {},
  onSaveHandler: (onSaveNotification?: () => void) => {},
  onContestEndHandler: (onContestEndNotification?: () => {}) => {},
});

export const useAnswerContext = () => {
  const contextValues = useContext(AnswerContext);
  return {
    ...contextValues,
  };
};

const AnswerContextProvider = ({ children }) => {
  /**
   * answer:{
   * [questionKey]:{
   * value: Respective state value
   * }}
   */
  /**
   * For chat the value is
   * {
   *  previousMessages:[],
   * toBeRenderedMessages:[]
   * }
   */
  /**
   * For email the value is string
   */
  const [answer, setAnswer] = useState({});
  const [isInitialAnswerFetching, setIsInitialAnswerFetching] = useState(false);
  const param = useParams();
  const onSaveHandler = useCallback(
    async (onSaveNotification?: (response: any) => void) => {
      console.log("param get", param.id);
      const requestBody = {
        contestId: param.id,
        answers: answer,
      };
      requestWrapper("/contest/save", {
        method: "POST",
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          onSaveNotification?.(response);
        })
        .catch((err) => {
          console.log("error in answer context", err);
          throw new Error("Error in answer context");
        });
    },
    [answer]
  );

  const onContestEndHandler = useCallback(
    (onContestEndNotification?: (response: any) => void) => {
      const requestBody = {
        contestId: param.id,
        answers: answer,
      };
      requestWrapper("/contest/save", {
        method: "POST",
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          onContestEndNotification?.(response);
        })
        .catch((err) => {
          console.log("error in answer context", err);
          throw new Error("Error in answer context");
        });
    },
    [answer]
  );

  const savedAnswerFetcher = () => {
    setIsInitialAnswerFetching(true);
    requestWrapper(`contest/${param.id}/answer`, {
      cache: "no-store",
    })
      .then((response) => {
        console.log("client", response.message.answer);
        setAnswer(response.message.answer || {});
      })
      .catch(() => {
        setAnswer({});
      })
      .finally(() => {
        setIsInitialAnswerFetching(false);
      });
  };
  useEffect(() => {
    savedAnswerFetcher();
  }, []);
  if (isInitialAnswerFetching) {
    return <p>Loading...</p>;
  }
  return (
    <AnswerContext.Provider
      value={{
        answers: answer,
        setAnswer,
        onSaveHandler,
        onContestEndHandler,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export default AnswerContextProvider;
