import { useEffect, useRef } from "react";
import Bot from "./Bubble/Bot";
import User from "./Bubble/User";
import { ScrollShadow, Spinner } from "@nextui-org/react";

export type MessagePersona = "user" | "bot";
export interface IChatMessages {
  type: MessagePersona;
  message: string;
}

export interface IChatContainer {
  chatMessages: IChatMessages[];
  isLoading?: boolean;
}
const ChatContainer = ({ chatMessages, isLoading = false }: IChatContainer) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const totalChatMessages = chatMessages.length;

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [lastMessageRef, chatMessages]);
  return (
    <ScrollShadow className="h-[50vh] overflow-y-auto mb-5">
      <div className="flex flex-col gap-3">
        {chatMessages.map((chatMessage, idx) => {
          const isBotMessage = chatMessage.type === "bot";
          const isLastMessage = totalChatMessages === idx + 1;
          if (isBotMessage) {
            return (
              <div
                key={idx}
                {...(isLastMessage
                  ? {
                      ref: lastMessageRef,
                    }
                  : {})}
              >
                <Bot message={chatMessage.message} />
              </div>
            );
          }
          return (
            <div
              key={idx}
              {...(isLastMessage
                ? {
                    ref: lastMessageRef,
                  }
                : {})}
            >
              <User message={chatMessage.message} />
            </div>
          );
        })}
      </div>
      {isLoading && <Spinner size="sm" color="primary" />}
    </ScrollShadow>
  );
};

export default ChatContainer;
