import { Button, Input } from "@nextui-org/react";

export interface IChatFooterProps {
  isDisabled?: boolean;
  onSubmit: (e?: any) => void;
  onChange: (e: any) => void;
  currentValue: string;
}
const ChatFooter = ({
  onChange,
  currentValue,
  onSubmit,
  isDisabled,
}: IChatFooterProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={currentValue}
        isDisabled={isDisabled}
        required
      />
      <Button type="submit" disabled={isDisabled || !currentValue}>
        Send
      </Button>
    </form>
  );
};

export default ChatFooter;
