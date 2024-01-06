// This route is applicable only for candidates

import { notFound } from "next/navigation";
import LessonsListing from "./LessonsListing";

import HeaderSetter from "../Components/Header/HeaderSetter";
import { lessons } from "../constants/lessons";

// This page contains list of categories and recommended chapters.
const Learn = () => {
  try {
    const lessonsList = Object.keys(lessons);
    console.log("lessons", lessonsList);
    return (
      <section className="layout">
        <HeaderSetter title="Learn" />
        <LessonsListing lessonIds={lessonsList} />
      </section>
    );
  } catch (err) {
    console.log("Error in lesson listing page", err);
    return notFound();
  }
};

export default Learn;
