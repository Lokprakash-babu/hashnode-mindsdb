"use client";

import useAccountContext from "@/app/hooks/useAccountContext";
import RegisterPath from "../Onboarding/RegisterPath";

const HomePage = () => {
  const { account_type, id } = useAccountContext();
  return !account_type && <RegisterPath accountId={id} />;
};

export default HomePage;
