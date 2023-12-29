import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import ContestDetailsProvider from "./ContestDetailsContext";
import Trigger from "./Timer/Trigger";
import ContestHeader from "./ContestHeader";
import ContestProblemDescription from "./ContestProblemDescription";
import ContestSolutionWidget from "./ContestSolutionWidget";
import Footer from "./Footer";
import AnswerContextProvider from "./AnswerContext";

//This page is accessible only for Candidates
const ContestPageAttempt = async ({ params }: { params: { id: string } }) => {
  try {
    const contestDetail = await requestWrapper(`/contest/${params.id}`);
    return (
      <>
        {/**Trigger checks if the candidate already started the contest.
         * If not, the trigger will register that the candidate started the contest,
         * else, the timer will be retrieved and displayed in the Timer display */}
        <Trigger />
        <ContestDetailsProvider contestDetails={contestDetail.data[0]}>
          <AnswerContextProvider>
            <ContestHeader />
            <ContestProblemDescription />
            <ContestSolutionWidget />
            <Footer />
          </AnswerContextProvider>
        </ContestDetailsProvider>
      </>
    );
  } catch (err) {
    return notFound();
  }
};

export default ContestPageAttempt;
