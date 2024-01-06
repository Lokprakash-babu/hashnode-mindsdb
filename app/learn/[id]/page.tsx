import { notFound } from "next/navigation";
import LessonDetails from "./LessonDetails";
import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import BreadCrumb from "@/app/Components/BreadCrumb";
import SubHeader from "@/app/Components/SubHeader";
import { lessons } from "@/app/constants/lessons";

const LessonDetailsPage = ({ params }: { params: { id: string } }) => {
  try {
    const lessonDetails = lessons[params.id];
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
          <LessonDetails chapters={lessonDetails} lessonId={params.id} />
        </section>
      </>
    );
  } catch (err) {
    console.log("error", err);
    return notFound();
  }
};

export default LessonDetailsPage;
