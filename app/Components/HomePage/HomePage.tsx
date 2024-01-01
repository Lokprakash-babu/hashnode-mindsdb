"use client";

import useAccountContext from "@/app/hooks/useAccountContext";
import RegisterPath from "../Onboarding/RegisterPath";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { account_type, id } = useAccountContext();
  console.log("account type", account_type);
  const router = useRouter();
  if (account_type === "candidate") {
    router.replace("/learn");
  } else {
    router.replace("/contests");
  }
  return null;
};

export default HomePage;
