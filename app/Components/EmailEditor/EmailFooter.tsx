import { Button } from "@nextui-org/react";

export interface IEmailFooter {
  onClick: () => any;
  textContent: string;
}

const EmailFooter = (props: IEmailFooter) => {
  return (
    <div>
      <div>Number of Characters: {props.textContent.length}</div>
      <Button onClick={props.onClick}>Send</Button>
    </div>
  );
};

export default EmailFooter;
