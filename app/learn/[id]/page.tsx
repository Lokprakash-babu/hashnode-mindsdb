import { requestWrapper } from "@/lib/requestWrapper";
import { notFound, redirect } from "next/navigation";
import LessonDetails from "./LessonDetails";
import { getServerSession } from "next-auth";

const LessonDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
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
