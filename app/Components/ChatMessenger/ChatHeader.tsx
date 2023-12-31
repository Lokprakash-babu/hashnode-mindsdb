import { Button, ButtonGroup } from "@nextui-org/react";
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
        <div className="action-container mb-4">
          <ButtonGroup
            isDisabled={isChatLoading}
            variant="bordered"
            className="w-full justify-end"
          >
            <Button onClick={resetChat}>Reset Chat</Button>
            <Button onClick={() => onEndChat?.()}>End Chat</Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
