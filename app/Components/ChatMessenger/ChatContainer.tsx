export type MessagePersona = "user" | "bot";
export interface IChatMessages {
  type: MessagePersona;
  message: string;
}

export interface IChatContainer {
  chatMessages: IChatMessages[];
}
const ChatContainer = ({ chatMessages }: IChatContainer) => {
  return (
    <div>
      {chatMessages.map((chatMessage, idx) => {
        const isBotMessage = chatMessage.type === "bot";
        if (isBotMessage) {
          return <h2 key={idx}>{chatMessage.message}</h2>;
        }
        return <p key={idx}>{chatMessage.message}</p>;
      })}
    </div>
  );
};

export default ChatContainer;
