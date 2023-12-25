import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import LessonDetails from "./LessonDetails";

const LessonDetailsPage = async ({ params }: { params: { id: string } }) => {
  try {
    console.log("params", params);
    const lessonDetails = await requestWrapper(`/lessons/${params.id}`);
    console.log("lesson details", lessonDetails.message);
    return (
      <>
        <LessonDetails chapters={lessonDetails.message} />
      </>
    );
  } catch (err) {
    console.log("error", err);
    return notFound();
  }
};

export default LessonDetailsPage;
