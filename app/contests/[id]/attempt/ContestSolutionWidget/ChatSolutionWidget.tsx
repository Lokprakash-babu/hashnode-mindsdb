import { MessagePersona } from "@/app/Components/ChatMessenger/ChatContainer";
import ContestChatMessenger from "@/app/Components/ChatMessenger/Contest";
import { requestWrapper } from "@/lib/requestWrapper";
import { useEffect, useState } from "react";
import { useAnswerContext } from "../AnswerContext";

const ChatSolutionWidget = ({ questionDetails, onChange, questionKey }) => {
  const { initial_text, tone } = questionDetails;
  const initialState = {
    type: "bot" as MessagePersona,
    message: initial_text,
  };
  const { answers } = useAnswerContext();
  const [chatMessages, setChatMessages] = useState(
    answers[questionKey]?.value || {
      previousMessages: [initialState],
      toBeRenderedMessages: [initialState],
    }
  );
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [userEnteredMessage, setUserEnteredMessage] = useState("");
  useEffect(() => {
    onChange(chatMessages);
  }, [chatMessages]);
  const onPostMessage = () => {
    const userTypedMessage = {
      type: "user" as MessagePersona,
      message: userEnteredMessage,
    };
    setChatMessages({
      previousMessages: [...chatMessages.previousMessages],
      toBeRenderedMessages: [
        ...chatMessages.toBeRenderedMessages,
        userTypedMessage,
      ],
    });
    setIsChatLoading(true);
    const requestBody = {
      previousMessages: chatMessages.previousMessages,
      latestMessage: userEnteredMessage,
      context: `You are an angry customer who asked a customer support agent this ${initial_text}?`,
    };
    requestWrapper("/chat", {
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        setUserEnteredMessage("");
        const { message } = response;
        const recentBotMessage = {
          type: "bot" as MessagePersona,
          message,
        };
        const messageUpdatedValue = [
          ...chatMessages.previousMessages,
          userTypedMessage,
          recentBotMessage,
        ];
        setChatMessages({
          previousMessages: messageUpdatedValue,
          toBeRenderedMessages: messageUpdatedValue,
        });
        setIsChatLoading(false);
      })
      .catch((err) => {
        setIsChatLoading(false);
        console.log("error", err);
        throw new Error("Error needs to be corrected in chat solution widget");
      });
  };

  return (
    <ContestChatMessenger
      onPostMessage={onPostMessage}
      chatMessages={chatMessages.toBeRenderedMessages}
      isLoading={isChatLoading}
      userEnteredMessage={userEnteredMessage}
      setUserEnteredMessage={setUserEnteredMessage}
    />
  );
};

export default ChatSolutionWidget;
