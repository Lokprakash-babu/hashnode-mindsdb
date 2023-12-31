import HeroBanner from "./HeroBanner";
import ProfileInfo from "./ProfileInfo";
import ProfileInformation from "./ProfileInformation";
const CandidateProfile = ({ user }) => {
  return (
    <div className="profile-wrapper flex flex-col">
      <HeroBanner avatarUrl={user.avatar_url} />
      <ProfileInformation user={user} />
      <ProfileInfo user={user} />
    </div>
  );
};

export default CandidateProfile;
