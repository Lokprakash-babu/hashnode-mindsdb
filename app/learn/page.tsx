// This route is applicable only for candidates

import { requestWrapper } from "@/lib/requestWrapper";
import { notFound, redirect } from "next/navigation";
import LessonsListing from "./LessonsListing";
import { getServerSession } from "next-auth";
import HeaderSetter from "../Components/Header/HeaderSetter";

// This page contains list of categories and recommended chapters.
const Learn = async () => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
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
