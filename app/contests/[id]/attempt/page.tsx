import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import ContestDetailsProvider from "./ContestDetailsContext";
import ContestHeader from "./ContestHeader";
import ContestProblemDescription from "./ContestProblemDescription";
import ContestSolutionWidget from "./ContestSolutionWidget";
import Footer from "./Footer";
import AnswerContextProvider from "./AnswerContext";
import FullScreenChecker from "./Fullscreen";
import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import AutoSave from "./AutoSave";
import Timer from "./Timer";
import Button from "@/app/Components/Buttons";
import Link from "next/link";

//This page is accessible only for Candidates
const ContestPageAttempt = async ({ params }: { params: { id: string } }) => {
  try {
    const contestDetail = await requestWrapper(`/contest/start`, {
      method: "POST",
      body: JSON.stringify({
        contestId: params.id,
      }),
      cache: "no-store",
    });
    console.log("contest details", contestDetail);
    const isContestAlreadyEnded =
      contestDetail?.message === "Contest is done already!";
    //TODO: Contest ended page
    if (isContestAlreadyEnded) {
      console.log("contest ended");
      return (
        <>
          <HeaderSetter title={`Contest: ${params.id}`} />

          <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
            <p className="text-lg font-bold">
              You have completed the contest already
            </p>
            <Link href="/contests">
              <Button color="primary">Go to contests</Button>
            </Link>
          </div>
        </>
      );
    }
    return (
      <>
        <HeaderSetter title={`Contest: ${params.id}`} />
        <section className="px-[90px] pt-[50px]">
          {/* <FullScreenChecker /> */}
          <ContestDetailsProvider
            contestDetails={contestDetail.message.contestDetails}
          >
            <AnswerContextProvider>
              <div className="flex justify-between w-full items-center">
                <div>
                  <ContestHeader />
                </div>
                <div className="flex gap-1 items-center">
                  <Timer endTime={contestDetail?.message?.endTime} />

                  <AutoSave />
                </div>
              </div>
              <div className="flex mb-5 gap-8">
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
    console.log("contest details attempt page error", err);
    return notFound();
  }
};

export default ContestPageAttempt;
