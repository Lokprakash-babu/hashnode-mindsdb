import Button from "@/app/Components/Buttons";
import { IChatMessages } from "@/app/Components/ChatMessenger/ChatContainer";
import { requestWrapper } from "@/lib/requestWrapper";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { CircularProgress } from "@nextui-org/progress";
import { Tooltip } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useState } from "react";
import { AiFillCustomerService } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaRobot } from "react-icons/fa6";

const AskAI = ({ lessonId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [chatContext, setChatContext] = useState<IChatMessages[]>([]);
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
    requestWrapper(`/lessons/askai`, {
      method: "POST",
      body: JSON.stringify({
        question: currentQuestion,
        lessonId: lessonId,
      }),
    })
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
  return (
    <>
      <Tooltip content="Ask AI" placement="left">
        <button
          onClick={onOpen}
          className="border border-gray rounded-full flex items-center gap-1 group text-black p-5"
        >
          <AiFillCustomerService />
        </button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={(isModalOpen) => {
          if (!isModalOpen) {
            setChatContext([]);
          }
          onOpenChange();
        }}
        size="3xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ask AI</ModalHeader>
              <ModalBody>
                <div className="max-h-[40vh] overflow-y-auto">
                  {chatContext.length === 0 && (
                    <h1>
                      Having a doubt in the current chapter? Ask AI to get
                      clarified
                    </h1>
                  )}
                  {chatContext.map((chatMessage, idx) => {
                    if (chatMessage.type === "bot") {
                      return (
                        <div key={idx} className="flex gap-4 items-start mb-5">
                          <div>
                            <FaRobot size={25} />
                          </div>
                          <p className="text-gray text-lg">
                            {chatMessage.message}
                          </p>
                        </div>
                      );
                    }
                    return (
                      <div key={idx} className="flex gap-4 items-start mb-5">
                        <CiEdit size={25} />
                        <h2 className="text-black header-2">
                          {chatMessage.message}
                        </h2>
                      </div>
                    );
                  })}
                  {httpRequest.loading && (
                    <CircularProgress size="sm" aria-label="Loading..." />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <form onSubmit={onFormSubmit} className="w-full">
                  <Input
                    placeholder="Ask a question"
                    value={currentQuestion}
                    onValueChange={setCurrentQuestion}
                    inputMode="text"
                    disabled={httpRequest.loading}
                    endContent={
                      <button type="submit">
                        <IoMdSend />
                      </button>
                    }
                    required
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
