"use client";
import { useRouter } from "next/navigation";
import RegisterPath from "./Components/Onboarding/RegisterPath";
import useAccountContext from "./hooks/useAccountContext";
import HeaderSetter from "./Components/Header/HeaderSetter";
export default function Home() {
  const { account_type, id } = useAccountContext();
  const router = useRouter();
  if (account_type) {
    const isCandidate = account_type === "candidate";
    if (isCandidate) {
      router.replace("/learn");
    } else {
      router.replace("/contests");
    }
  }
  return (
    !account_type && (
      <>
        <HeaderSetter title={"Register"} />
        <RegisterPath accountId={id} />
      </>
    )
  );
}
