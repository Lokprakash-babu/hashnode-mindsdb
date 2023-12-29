"use client";
import ChatFooter from "../ChatFooter";
import ChatContainer, { IChatMessages } from "../ChatContainer";

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
  return (
    <>
      <ChatContainer chatMessages={chatMessages} />
      <ChatFooter
        currentValue={userEnteredMessage}
        onChange={setUserEnteredMessage}
        onSubmit={onPostMessage}
        isDisabled={isLoading}
      />
    </>
  );
};

export default ContestChatMessenger;
