import ChatMessenger from "@/app/Components/ChatMessenger";
import EmailEditor from "@/app/Components/EmailEditor";
import { PracticeCategory } from "@/app/constants/practice";
import PracticeSolution from "@/app/practice/[id]/PracticeSolution";

interface ISubmissionDetails {
  languageFeedback: string;
  toneFeedback: string;
  overallFeedback: string;
  problemId: string;
  answer: string;
  score: string;
}
const SubmissionDetails = ({
  answer,
  languageFeedback,
  overallFeedback,
  problemId,
  score,
  toneFeedback,
}: ISubmissionDetails) => {
  const parsedAnswer = JSON.parse(answer);
  console.log("parsed answer", {
    parsedAnswer: parsedAnswer.answer,
    languageFeedback,
    overallFeedback,
    problemId,
    score,
    toneFeedback,
  });
  const isChatType = parsedAnswer.answer.filter((answer) => {
    return answer.type === "bot";
  }).length;
  return (
    <div>
      <div className="feedback-section"></div>
      <div className="submitted-answer">
        {isChatType && (
          <ChatMessenger chatHistory={parsedAnswer.answer} isReadOnly />
        )}
        {!isChatType && (
          <EmailEditor initialValue={parsedAnswer[0].message} isReadOnly />
        )}
      </div>
    </div>
  );
};

export default SubmissionDetails;
