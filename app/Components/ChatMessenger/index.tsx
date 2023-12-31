"use client";
import { requestWrapper } from "@/lib/requestWrapper";
import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatContainer, { IChatMessages, MessagePersona } from "./ChatContainer";

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
  chatMessageLimit = 5,
  isReadOnly = false,
  chatHistory = [],
  onEndChat,
  onSave,
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
      .catch((err) => {
        setIsLoading(false);
        console.log("error", err);
      });
  };

  const endChat = () => {
    //Post the messages for feedback
    onEndChat?.(chatMessages.previousMessages as IChatMessages[]);
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
        <ChatContainer chatMessages={chatMessages.toBeRenderedMessages} />
        {!isReadOnly && (
          <ChatFooter
            currentValue={latestMessage}
            onChange={setLatestMessage}
            onSubmit={postMessage}
            isDisabled={isLoading}
          />
        )}
      </div>
    </>
  );
};

export default ChatMessenger;
