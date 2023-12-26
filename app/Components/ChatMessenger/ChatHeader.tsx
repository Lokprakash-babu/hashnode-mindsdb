import { Button } from "@nextui-org/react";
import React from "react";
export interface IChatHeader {
  onEndChat?: (e?: any) => void;
  isReadOnlyMode?: boolean;
  resetChat?: () => void;
  isChatLoading?: boolean;
}
const ChatHeader = ({
  onEndChat,
  isReadOnlyMode,
  resetChat,
  isChatLoading = false,
}: IChatHeader) => {
  return (
    <>
      {!isReadOnlyMode && (
        <div className="action-container flex gap-5">
          <Button onClick={resetChat} disabled={isChatLoading}>
            Reset Chat
          </Button>
          <Button onClick={() => onEndChat?.()} disabled={isChatLoading}>
            End Chat
          </Button>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
