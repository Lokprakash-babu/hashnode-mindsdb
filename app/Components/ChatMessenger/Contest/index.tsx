"use client";
import ChatFooter from "../ChatFooter";
import ChatContainer, { IChatMessages } from "../ChatContainer";
import { useEffect } from "react";
import Toast from "../../Toasts/Toast";
import { toast } from "react-toastify";

export interface IContestChatMessenger {
  isLoading?: boolean;
  onPostMessage: (e?: any) => void;
  chatMessages: IChatMessages[];
  userEnteredMessage: string;
  setUserEnteredMessage: (val: string) => void;
}
const ContestChatMessenger = ({
  isLoading = false,
  onPostMessage,
  chatMessages,
  userEnteredMessage,
  setUserEnteredMessage,
}: IContestChatMessenger) => {
  const totalChatMessageByCandidate = chatMessages.filter((chatMessage) => {
    return chatMessage.type !== "bot";
  }).length;
  useEffect(() => {
    if (totalChatMessageByCandidate >= 6) {
      toast.error(
        "You have entered more than 6 messages. Either End Chat or Reset the chat"
      );
    }
  }, [totalChatMessageByCandidate]);
  return (
    <>
      <ChatContainer chatMessages={chatMessages} />
      {totalChatMessageByCandidate < 6 && (
        <ChatFooter
          currentValue={userEnteredMessage}
          onChange={setUserEnteredMessage}
          onSubmit={onPostMessage}
          isDisabled={isLoading}
        />
      )}
      <Toast />
    </>
  );
};

export default ContestChatMessenger;
