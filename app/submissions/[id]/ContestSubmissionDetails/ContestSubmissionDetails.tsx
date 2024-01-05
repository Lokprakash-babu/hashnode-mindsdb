import SubmissionFeedback from "../SubmissionFeedback";
import Link from "next/link";
import QuestionsTab from "./QuestionsTab";

interface ISubmissionDetails {
  languageFeedback: string;
  toneFeedback: string;
  overallFeedback: string;
  problemId: string;
  answer: string;
  score: string;
}
const ContestSubmissionDetails = ({
  answer,
  languageFeedback,
  overallFeedback,
  problemId,
  score,
  toneFeedback,
}: ISubmissionDetails) => {
  const parsedAnswer = answer;
  console.log("parsed answer", {
    answer,
    languageFeedback,
    overallFeedback,
    problemId,
    score,
    toneFeedback,
  });
  return (
    <div className="flex justify-between gap-5">
      <div className="feedback-section flex-1">
        <div className="flex gap-8 mb-2">
          <h2 className="header-2-600">
            Score: <span className="text-md text-[#363062]">{score}</span>
          </h2>
          <div>
            <Link
              href={`/contests/${problemId}`}
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
        <QuestionsTab questions={answer} />
      </div>
    </div>
  );
};

export default ContestSubmissionDetails;
