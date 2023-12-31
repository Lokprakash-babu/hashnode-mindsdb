import { Input } from "@nextui-org/react";
import { IoMdSend } from "react-icons/io";

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <Input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder="Respond to the customer"
        value={currentValue}
        isDisabled={isDisabled}
        classNames={{
          inputWrapper: "bg-white text-black h-5",
        }}
        endContent={
          <>
            <button
              type="submit"
              className="text-[#398AB9]"
              disabled={isDisabled}
            >
              <IoMdSend />
            </button>
          </>
        }
        maxLength={400}
        isRequired
        required
      />
    </form>
  );
};

export default ChatFooter;
