"use client";
import Button from "@/app/Components/Buttons";
import Toast from "@/app/Components/Toasts/Toast";
import { requestWrapper } from "@/lib/requestWrapper";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
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
  const [submitted, setSubmitted] = useState(false);
  const onSaveHandler = useCallback(
    async (onSaveNotification?: (response: any) => void) => {
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
          throw new Error("Error in answer context");
        })
        .finally(() => {
          setSubmitted(true);
        });
    },
    [answer]
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onContestEndHandler = useCallback(
    (onContestEndNotification?: (response: any) => void) => {
      const requestBody = {
        contestId: param.id,
        answers: answer,
      };
      onOpen();
      requestWrapper("/contest/end", {
        method: "POST",
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          onContestEndNotification?.(response);
        })
        .catch((err) => {
          toast.error(
            "Something went wrong, don't worry your answers are safe with us!"
          );
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
      <Modal
        isDismissable={false}
        size={"lg"}
        isOpen={isOpen}
        onClose={onClose}
        closeButton={<></>}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Hurray!</ModalHeader>
              <ModalBody>
                {submitted ? (
                  <p className="text-md">
                    You have successfully completed the contest
                  </p>
                ) : (
                  <p className="text-md">Your answers are being evaluated...</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Link href={"/contests"}>
                  <Button
                    color="primary"
                    onPress={onClose}
                    isLoading={!submitted}
                    disabled={!submitted}
                  >
                    Go to contests
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toast />
    </AnswerContext.Provider>
  );
};

export default AnswerContextProvider;
