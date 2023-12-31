import { requestWrapper } from "@/lib/requestWrapper";
import { notFound, redirect } from "next/navigation";
import ContestDetailsProvider from "./ContestDetailsContext";
import Trigger from "./Timer/Trigger";
import ContestHeader from "./ContestHeader";
import ContestProblemDescription from "./ContestProblemDescription";
import ContestSolutionWidget from "./ContestSolutionWidget";
import Footer from "./Footer";
import AnswerContextProvider from "./AnswerContext";
import FullScreenChecker from "./Fullscreen";
import HeaderSetter from "@/app/Components/Header/HeaderSetter";

//This page is accessible only for Candidates
const ContestPageAttempt = async ({ params }: { params: { id: string } }) => {
  try {
    const contestDetail = await requestWrapper(`/contest/start`, {
      method: "POST",
      body: JSON.stringify({
        contestId: params.id,
      }),
    });
    console.log("contest details", contestDetail);
    const isContestAlreadyEnded =
      contestDetail?.message === "Contest already ended";
    //TODO: Contest ended page
    if (isContestAlreadyEnded) {
      console.log("contest ended");
      return notFound();
    }
    return (
      <>
        {/**Trigger checks if the candidate already started the contest.
         * If not, the trigger will register that the candidate started the contest,
         * else, the timer will be retrieved and displayed in the Timer display */}
        <HeaderSetter title={`Contest: ${params.id}`} />
        <Trigger params={params} />
        <section className="px-[90px]">
          <FullScreenChecker />
          <ContestDetailsProvider
            contestDetails={contestDetail.message.contestDetails}
          >
            <AnswerContextProvider>
              <ContestHeader />
              <div className="flex mb-5">
                <div className="flex-1">
                  <ContestProblemDescription />
                </div>
                <div className="flex-1">
                  <ContestSolutionWidget />
                </div>
              </div>
              <Footer />
            </AnswerContextProvider>
          </ContestDetailsProvider>
        </section>
      </>
    );
  } catch (err) {
    console.log("contest details attemp page error", err);
    return notFound();
  }
};

export default ContestPageAttempt;
