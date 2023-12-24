// This route is applicable only for candidates

import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import LessonsListing from "./LessonsListing";

// This page contains list of categories and recommended chapters.
const Learn = async () => {
  try {
    const getLessons = await requestWrapper(`/lessons`);
    console.log("CsmLessons", getLessons);
    const lessons = getLessons.message;
    return (
      <>
        <LessonsListing lessons={lessons} />
      </>
    );
  } catch (err) {
    return notFound();
  }
};

export default Learn;
