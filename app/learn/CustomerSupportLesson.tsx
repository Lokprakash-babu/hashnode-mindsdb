import { requestWrapper } from "@/lib/requestWrapper";
import { notFound } from "next/navigation";
import { AVAILABLE_CATEGORIES } from "../constants/categories";

const CustomerSupportLesson = async () => {
  try {
    const CsmLessons = await requestWrapper(
      `/lessons?category=${AVAILABLE_CATEGORIES.CUSTOMER_SUPPORT}`
    );
    console.log("CsmLessons", CsmLessons);
    return <div>CustomerSupportLesson</div>;
  } catch (err) {
    console.log("errrrr", err);
    return notFound();
  }
};

export default CustomerSupportLesson;
