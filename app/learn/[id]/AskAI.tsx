import { requestWrapper } from "@/lib/requestWrapper";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { CircularProgress } from "@nextui-org/progress";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useState } from "react";

const AskAI = ({ chapterId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [chatContext, setChatContext] = useState([
    {
      message: "Having a doubt in the current chapter? Ask AI to get clarified",
      type: "bot",
    },
  ]);
  const [httpRequest, setHttpRequest] = useState({
    data: "",
    loading: false,
    error: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
    setChatContext([
      ...chatContext,
      {
        type: "user",
        message: currentQuestion,
      },
    ]);
    setHttpRequest({
      data: "",
      loading: true,
      error: "",
    });
    setCurrentQuestion("");

    requestWrapper(
      `/lessons/askai?chapterId=${chapterId}&question=${currentQuestion}`
    )
      .then((response) => {
        setHttpRequest({
          data: response.message,
          loading: false,
          error: "",
        });
        setChatContext((latestChatContext) => {
          return [
            ...latestChatContext,
            {
              type: "bot",
              message: response.message,
            },
          ];
        });
      })
      .catch((err) => {
        setHttpRequest({
          data: "",
          loading: false,
          error: err,
        });
      });
  };
  console.log("http request", httpRequest);
  return (
    <>
      <Button onClick={onOpen}>Quiz</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ask AI</ModalHeader>
              <ModalBody>
                <div className="max-h-[40vh] overflow-y-auto">
                  {chatContext.map((chatMessage, idx) => {
                    if (chatMessage.type === "bot") {
                      return (
                        <h1 key={idx} className="text-black">
                          {chatMessage.message}
                        </h1>
                      );
                    }
                    return (
                      <p key={idx} className="text-black">
                        {chatMessage.message}
                      </p>
                    );
                  })}
                  {httpRequest.loading && (
                    <CircularProgress size="sm" aria-label="Loading..." />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <form onSubmit={onFormSubmit}>
                  <Input
                    placeholder="Ask a question"
                    value={currentQuestion}
                    onValueChange={setCurrentQuestion}
                    inputMode="text"
                    disabled={httpRequest.loading}
                    isRequired
                  />
                </form>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AskAI;
