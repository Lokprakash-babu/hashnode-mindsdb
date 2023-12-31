import { removeHtmlTags } from "@/app/utils/sanitizeMarkdown";
import Button from "../Buttons";
import { IoMdSend } from "react-icons/io";

export interface IEmailFooter {
  onClick: () => any;
  textContent: string;
}

const EmailFooter = (props: IEmailFooter) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-md">
        Number of Characters: {removeHtmlTags(props.textContent).length}
      </p>
      <Button
        onClick={props.onClick}
        endContent={<IoMdSend />}
        className="text-md"
      >
        Send
      </Button>
    </div>
  );
};

export default EmailFooter;
