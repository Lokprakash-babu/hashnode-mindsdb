import { requestWrapper } from "@/lib/requestWrapper";
import { notFound, redirect } from "next/navigation";
import LessonDetails from "./LessonDetails";
import { getServerSession } from "next-auth";
import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import BreadCrumb from "@/app/Components/BreadCrumb";
import SubHeader from "@/app/Components/SubHeader";

const LessonDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
  try {
    console.log("params", params);
    const lessonDetails = await requestWrapper(`/lessons/${params.id}`);
    console.log("lesson details", lessonDetails.message);
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
    return (
      <>
        <HeaderSetter title={`Lesson`} />
        <SubHeader>
          <BreadCrumb crumbs={crumbs} />
        </SubHeader>
        <section className="layout">
          <LessonDetails chapters={lessonDetails.message} />
        </section>
      </>
    );
  } catch (err) {
    console.log("error", err);
    return notFound();
  }
};

export default LessonDetailsPage;
