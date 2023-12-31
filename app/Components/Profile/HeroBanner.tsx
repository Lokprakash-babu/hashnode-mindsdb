import { Avatar } from "@nextui-org/react";

const HeroBanner = ({ avatarUrl }) => {
  return (
    <div className="min-h-[196px] gradient bg-gradient-to-r from-cyan-500 to-blue-500 relative">
      <Avatar
        src={avatarUrl}
        className="w-[152px] h-[152px] text-large absolute left-[28px] bottom-[-60px]"
      />
    </div>
  );
};

export default HeroBanner;
