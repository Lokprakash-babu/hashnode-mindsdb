"use client";
import CandidateProfile from "../Components/Profile/CandidateProfile";
import ManagerProfile from "../Components/Profile/ManagerProfile";
import useAccountContext from "../hooks/useAccountContext";

const ProfileLayout = () => {
  const { account_type, ...user } = useAccountContext();
  const profileComponent =
    account_type === "hiring_manager" ? (
      <CandidateProfile user={user} />
    ) : (
      <ManagerProfile user={user} />
    );

  return <div className="ml-[60px]">{profileComponent}</div>;
};

export default ProfileLayout;
