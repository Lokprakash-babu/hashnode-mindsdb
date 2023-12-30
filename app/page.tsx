"use client";
import RegisterPath from "./Components/Onboarding/RegisterPath";
import useAccountContext from "./hooks/useAccountContext";
export default function Home() {
  const { account_type, id } = useAccountContext();
  return !account_type && <RegisterPath accountId={id} />;
}
