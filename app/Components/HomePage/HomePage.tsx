"use client";

import useAccountContext from "@/app/hooks/useAccountContext";
import RegisterPath from "../Onboarding/RegisterPath";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const HomePage = () => {
  const { account_type } = useAccountContext();
  const { userId } = useAuth();
  const router = useRouter();
  if (!account_type) {
    return <RegisterPath accountId={userId} />;
  }
  if (account_type === "candidate") {
    router.replace("/learn");
  } else {
    router.replace("/contests");
  }
  return null;
};

export default HomePage;
