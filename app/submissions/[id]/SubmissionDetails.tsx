import ChatMessenger from "@/app/Components/ChatMessenger";
import EmailEditor from "@/app/Components/EmailEditor";
import SubmissionFeedback from "./SubmissionFeedback";
import Link from "next/link";

interface ISubmissionDetails {
  languageFeedback: string;
  toneFeedback: string;
  problemId: string;
  answer: any;
  score: string;
}
const SubmissionDetails = ({
  answer,
  languageFeedback,
  problemId,
  score,
  toneFeedback,
}: ISubmissionDetails) => {
  const parsedAnswer = answer;

  const isChatType = Array.isArray(parsedAnswer?.answer);
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
