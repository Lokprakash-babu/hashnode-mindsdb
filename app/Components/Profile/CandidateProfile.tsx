import HeroBanner from "./HeroBanner";

const CandidateProfile = ({ user }) => {
  console.log("User", user);
  return (
    <div className="profile-wrapper flex flex-col">
      <HeroBanner avatarUrl={user.avatar_url} />
    </div>
  );
};

export default CandidateProfile;
