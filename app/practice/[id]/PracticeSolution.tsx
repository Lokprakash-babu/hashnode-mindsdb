import ChatMessenger, { IChatMessenger } from "@/app/Components/ChatMessenger";
import EmailEditor, { IEmailEditor } from "@/app/Components/EmailEditor";
import { PracticeCategory } from "@/app/constants/practice";

type chatMessengerType = {
  type: PracticeCategory.CHAT;
} & IChatMessenger;

type emailMessengerType = {
  type: PracticeCategory.EMAIL;
} & IEmailEditor;

type PracticeSolutionProps = emailMessengerType | chatMessengerType;
const PracticeSolution = (props: PracticeSolutionProps) => {
  const solutionType = props.type;
  switch (solutionType) {
    case PracticeCategory.CHAT:
      return <ChatMessenger {...props} />;
    case PracticeCategory.EMAIL:
      return <EmailEditor {...props} />;
    default:
      return null;
  }
};

export default PracticeSolution;
