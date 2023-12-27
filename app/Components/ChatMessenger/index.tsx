"use client";
import { requestWrapper } from "@/lib/requestWrapper";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";

interface IChat {
  type: "user" | "bot";
  message: string;
}
export interface IChatMessenger {
  initialMessage?: string;
  context?: string;
  chatMessageLimit?: number;
  isReadOnly?: boolean;
  chatHistory?: IChat[];
  onEndChat?: (messages: IChat[]) => void;
}
const ChatMessenger = ({
  initialMessage,
  context,
  chatMessageLimit = 5,
  isReadOnly = false,
  chatHistory = [],
  onEndChat,
}: IChatMessenger) => {
  const initialState = !chatHistory.length
    ? [
        {
          type: "bot",
          message: initialMessage,
        },
      ]
    : chatHistory;
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
        type: "user",
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
            type: "bot",
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
    onEndChat?.(chatMessages.previousMessages as IChat[]);
  };
  return (
    <>
      <ChatHeader
        isChatLoading={isLoading}
        isReadOnlyMode={isReadOnly}
        resetChat={resetChat}
        onEndChat={postMessage}
      />
      <div>
        {chatMessages.toBeRenderedMessages.map((chatMessage, idx) => {
          const isBotMessage = chatMessage.type === "bot";
          if (isBotMessage) {
            return <h2 key={idx}>{chatMessage.message}</h2>;
          }
          return <p key={idx}>{chatMessage.message}</p>;
        })}
      </div>
      {!isReadOnly && (
        <ChatFooter
          currentValue={latestMessage}
          onChange={setLatestMessage}
          onSubmit={postMessage}
          isDisabled={isLoading}
        />
      )}
    </>
  );
};

export default ChatMessenger;
