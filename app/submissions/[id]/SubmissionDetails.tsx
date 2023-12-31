import ChatMessenger from "@/app/Components/ChatMessenger";
import EmailEditor from "@/app/Components/EmailEditor";
import SubmissionFeedback from "./SubmissionFeedback";
import Link from "next/link";

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
  const isChatType = parsedAnswer?.answer instanceof Array;
  return (
    <div className="flex justify-between gap-5">
      <div className="feedback-section flex-1">
        <div className="flex gap-8 mb-2">
          <h2 className="header-2-600">
            Score: <span className="text-md text-[#363062]">{score}</span>
          </h2>
          <div>
            <Link
              href={`/practice/${problemId}`}
              className="text-blue underline"
              target="_blank"
            >
              <p className="text-md">View Problem</p>
            </Link>
          </div>
        </div>
        <SubmissionFeedback
          languageFeedback={languageFeedback}
          toneFeedback={toneFeedback}
          overallFeedback={overallFeedback}
        />
      </div>
      <div className="submitted-answer flex-1">
        {isChatType && (
          <ChatMessenger chatHistory={parsedAnswer.answer} isReadOnly />
        )}
        {!isChatType && (
          <EmailEditor initialValue={parsedAnswer?.answer} isReadOnly />
        )}
      </div>
    </div>
  );
};

export default SubmissionDetails;
