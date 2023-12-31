import HeroBanner from "./HeroBanner";
import OrgInfo from "./OrgInfo";
import ProfileInformation from "./ProfileInformation";

const ManagerProfile = ({ user }) => {
  return (
    <div className="profile-wrapper flex flex-col">
      <HeroBanner avatarUrl={user.avatar_url} />
      <ProfileInformation user={user} />
      <OrgInfo user={user} />
    </div>
  );
};

export default ManagerProfile;
