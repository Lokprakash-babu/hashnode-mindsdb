import Phone from "@/app/Components/Icons/Phone";
import Sms from "@/app/Components/Icons/Sms";
const ProfileInformation = ({ user }) => {
  return (
    <div className="px-8 py-20 flex flex-col gap-y-6">
      <h1 className="header-1-600 capitalize">{user.name}</h1>
      <div className="info-pane flex justify-between">
        <div className="left-info-pane flex flex-col gap-y-10 min-w-[430px]">
          <div className="flex flex-col gap-y-3">
            <h1 className="header-2-600">Email</h1>
            <div className="flex gap-2 items-center">
              <Sms />
              <p>{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <h1 className="header-2-600">Phone Number</h1>
            <div className="flex gap-2 items-center">
              <Phone />
              <p>{user.phone_number || "--"}</p>
            </div>
          </div>
        </div>
        <div className="right-info-pane flex flex-col gap-y-10 min-w-[203vw]">
          <div className="flex flex-col gap-y-3">
            <h1 className="header-2-600">Country</h1>
            <div className="flex gap-2 items-center">
              <p>{user.country}</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <h1 className="header-2-600">Experience</h1>
            <div className="flex gap-2 items-center">
              <p>{user.experience || "--"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
