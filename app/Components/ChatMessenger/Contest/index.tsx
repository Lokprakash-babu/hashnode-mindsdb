"use client";
import { useState } from "react";
import ChatFooter from "../ChatFooter";
import ChatContainer, { IChatMessages } from "../ChatContainer";

export interface IContestChatMessenger {
  isLoading?: boolean;
  onPostMessage: (e?: any) => void;
  chatMessages: IChatMessages[];
}
const ContestChatMessenger = ({
  isLoading = false,
  onPostMessage,
  chatMessages,
}: IContestChatMessenger) => {
  const [latestMessage, setLatestMessage] = useState("");
  return (
    <>
      <ChatContainer chatMessages={chatMessages} />
      <ChatFooter
        currentValue={latestMessage}
        onChange={setLatestMessage}
        onSubmit={onPostMessage}
        isDisabled={isLoading}
      />
    </>
  );
};

export default ContestChatMessenger;
