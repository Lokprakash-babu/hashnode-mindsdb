// This route is applicable only for candidates

import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import LessonsListing from "./LessonsListing";
import HeaderSetter from "../Components/Header/HeaderSetter";

// This page contains list of categories and recommended chapters.
const Learn = async () => {
  try {
    const getLessons = await requestWrapper(`/lessons`);
    const lessons = getLessons.message;
    return (
      <section className="layout">
        <HeaderSetter title="Learn" />
        <LessonsListing lessons={lessons} />
      </section>
    );
  } catch (err) {
    return notFound();
  }
};

export default Learn;
