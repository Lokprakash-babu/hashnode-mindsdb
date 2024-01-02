import { notFound } from "next/navigation";
import LessonDetails from "./LessonDetails";
import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import BreadCrumb from "@/app/Components/BreadCrumb";
import SubHeader from "@/app/Components/SubHeader";
import { getLessonDetails } from "@/app/db-handlers/lessons/getLessonDetails";

const LessonDetailsPage = async ({ params }: { params: { id: string } }) => {
  try {
    const lessonDetails = await getLessonDetails(params.id);
    const crumbs = [
      {
        label: "Learn",
        href: "/learn",
      },
      {
        label: params.id,
        href: `/learn/${params.id}`,
      },
    ];
    if (!lessonDetails) {
      return notFound();
    }
    return (
      <>
        <HeaderSetter title={`Lesson`} />
        <SubHeader>
          <BreadCrumb crumbs={crumbs} />
        </SubHeader>
        <section className="layout">
          <LessonDetails chapters={lessonDetails} />
        </section>
      </>
    );
  } catch (err) {
    console.log("error", err);
    return notFound();
  }
};

export default LessonDetailsPage;
