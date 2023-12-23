import { notFound } from "next/navigation";

const CustomerSupportLesson = async () => {
  try {
    const CsmLessons = await fetch(
      "http://localhost:3000/api/lessons?category=csm"
    );
    console.log("CsmLessons", CsmLessons);
    return <div>CustomerSupportLesson</div>;
  } catch (err) {
    console.log("errrrr", err);
    return notFound();
  }
};

export default CustomerSupportLesson;
