// This route is applicable only for candidates

import { notFound } from "next/navigation";
import LessonsListing from "./LessonsListing";

import HeaderSetter from "../Components/Header/HeaderSetter";
import { getLessonsQueryHandler } from "../db-handlers/lessons/getLessons";

// This page contains list of categories and recommended chapters.
const Learn = async () => {
  try {
    const lessons = await getLessonsQueryHandler();
    console.log("lessons", lessons);
    return (
      <section className="layout">
        <HeaderSetter title="Learn" />
        <LessonsListing lessons={lessons} />
      </section>
    );
  } catch (err) {
    console.log("Error in lesson listing page", err);
    return notFound();
  }
};

export default Learn;
