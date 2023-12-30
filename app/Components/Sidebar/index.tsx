"use client";

import clsx from "clsx";
import Link from "next/link";
import Sms from "../Icons/Sms";
import { usePathname } from "next/navigation";

const candidateSidebarOption = [
  {
    link: "/learn",
    label: "Learn",
    icon: <></>,
  },
  {
    link: "/practice",
    label: "Practice",
    icon: <></>,
  },
  {
    link: "/contests",
    label: "Contests",
    icon: <></>,
  },
  {
    link: "/submissions",
    label: "Submissions",
    icon: <></>,
  },
];
const hiringManagerSidebarOptions = [
  {
    link: "/contest",
    label: "Contests",
    icon: <></>,
  },
];

const SidebarOption = ({ link, label, icon }) => {
  const pathName = usePathname();
  const isActiveRoute = pathName.includes(link);
  //TODO: based on the active route change the icon color and Icon container color
  return (
    <div className={clsx("flex gap-2 items-center")}>
      <div className={clsx("icon-container w-6 h-6 ml-[18px]")}>
        <Sms />
      </div>
      <div className={clsx("link", "invisible group-hover:visible")}>
        <Link href={link}>{label}</Link>
      </div>
    </div>
  );
};
const Sidebar = () => {
  return (
    <aside
      className={clsx(
        "fixed group z-[1000] left-0 h-[100vh] overflow-hidden w-[60px] max-w-[240px] bg-[#12344d] text-white transition-all duration-100",
        "hover:w-[240px]"
      )}
    >
      {candidateSidebarOption.map((sidebarOption) => {
        return <SidebarOption {...sidebarOption} key={sidebarOption.label} />;
      })}
    </aside>
  );
};

export default Sidebar;
