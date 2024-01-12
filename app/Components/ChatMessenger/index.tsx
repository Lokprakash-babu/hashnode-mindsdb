"use client";
import { requestWrapper } from "@/lib/requestWrapper";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatContainer, { IChatMessages, MessagePersona } from "./ChatContainer";
import Toast from "../Toasts/Toast";
import { toast } from "react-toastify";

export interface IChatMessenger {
  initialMessage?: string;
  context?: string;
  chatMessageLimit?: number;
  isReadOnly?: boolean;
  chatHistory?: IChatMessages[];
  onEndChat?: (messages: IChatMessages[]) => void;
  onSave?: (messages: IChatMessages[]) => void;
}
const ChatMessenger = ({
  initialMessage,
  context,
  isReadOnly = false,
  chatHistory = [],
  onEndChat,
}: IChatMessenger) => {
  const initialState = !chatHistory.length
    ? [
        {
          type: "bot" as MessagePersona,
          message: initialMessage || "",
        },
      ]
    : (chatHistory as IChatMessages[]);
  const [chatMessages, setChatMessages] = useState({
    previousMessages: initialState,
    toBeRenderedMessages: initialState,
  });

  const [latestMessage, setLatestMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetChat = () =>
    setChatMessages({
      previousMessages: initialState,
      toBeRenderedMessages: initialState,
    });
  const postMessage = (e) => {
    e?.preventDefault();
    const enteredMessage = latestMessage;
    setLatestMessage("");
    const newToBeRenderedMessage = [
      ...chatMessages.toBeRenderedMessages,
      {
        type: "user" as MessagePersona,
        message: enteredMessage,
      },
    ];
    setChatMessages({
      ...chatMessages,
      toBeRenderedMessages: newToBeRenderedMessage,
    });
    setIsLoading(true);
    requestWrapper("/chat", {
      method: "POST",
      body: JSON.stringify({
        previousMessages: chatMessages.previousMessages,
        latestMessage: enteredMessage,
        context,
      }),
    })
      .then((response) => {
        const withBot = [
          ...newToBeRenderedMessage,
          {
            type: "bot" as MessagePersona,
            message: response.message,
          },
        ];
        setChatMessages({
          previousMessages: withBot,
          toBeRenderedMessages: withBot,
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Something went wrong in our end, we are checking it");
      });
  };

  const endChat = () => {
    const totalCandidateMessages = chatMessages.previousMessages.filter(
      (message) => message.type === "user"
    ).length;
    if (totalCandidateMessages >= 3 && totalCandidateMessages < 10) {
      onEndChat?.(chatMessages.previousMessages as IChatMessages[]);
    } else if (totalCandidateMessages < 3) {
      toast.error("More than 3 messages should be entered");
    } else {
      toast.error(
        "Less than 10 messages should be entered, reset the chat and start from first 😀"
      );
    }
  };
  return (
    <>
      <ChatHeader
        isChatLoading={isLoading}
        isReadOnlyMode={isReadOnly}
        resetChat={resetChat}
        onEndChat={endChat}
      />
      <div className="bg-[#EEF5FF] overflow-y-auto p-5 rounded-xl">
        <ChatContainer
          chatMessages={chatMessages.toBeRenderedMessages}
          isLoading={isLoading}
        />
        {!isReadOnly && (
          <ChatFooter
            currentValue={latestMessage}
            onChange={setLatestMessage}
            onSubmit={postMessage}
            isDisabled={isLoading}
          />
        )}
      </div>
      <Toast />
    </>
  );
};

export default ChatMessenger;
