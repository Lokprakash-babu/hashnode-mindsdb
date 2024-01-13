"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { GiBookCover } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import { Md3P } from "react-icons/md";
import { BsDatabase } from "react-icons/bs";
import { GiChampions } from "react-icons/gi";
import useAccountContext from "@/app/hooks/useAccountContext";

const candidateSidebarOption = [
  {
    link: "/learn",
    label: "Learn",
    icon: <GiBookCover size={25} />,
  },
  {
    link: "/practice",
    label: "Practice",
    icon: <FaUserGraduate size={25} />,
  },
  {
    link: "/contests",
    label: "Contests",
    icon: <MdOutlineTimer size={25} />,
  },
  {
    link: "/submissions",
    label: "Submissions",
    icon: <BsDatabase size={25} />,
  },
];
const hiringManagerSidebarOptions = [
  {
    link: "/recommendations",
    label: "Recommendations",
    icon: <FaUserGraduate size={25} />,
  },
  {
    link: "/contest",
    label: "Contests",
    icon: <MdOutlineTimer size={25} />,
  },
];

const SidebarOption = ({ link, label, icon, withoutActive = false }) => {
  const pathName = usePathname();
  const isActiveRoute = pathName.includes(link);
  //TODO: based on the active route change the icon color and Icon container color
  return (
    <Link href={link}>
      <div
        className={clsx(
          "flex gap-2 items-center rounded-xl p-2 mb-3  mx-[18px] transition-all duration-100",
          isActiveRoute && !withoutActive && "bg-white text-black"
        )}
      >
        <div className={clsx("icon-container")}>{icon}</div>
        <div className={clsx("link", "invisible group-hover:visible")}>
          <p className="text-md">{label}</p>
        </div>
      </div>
    </Link>
  );
};
const Sidebar = () => {
  const pathName = usePathname();
  const params = useParams();
  const { account_type } = useAccountContext();
  //Hide side bar if the candidate is attending a contest
  if (
    pathName.includes("attempt") &&
    pathName.includes("contest") &&
    params.id
  ) {
    return null;
  }
  const options =
    account_type === "candidate"
      ? candidateSidebarOption
      : hiringManagerSidebarOptions;
  return (
    <aside
      className={clsx(
        "fixed group z-[1000] left-0 h-[100vh] overflow-hidden w-[76px] max-w-[240px] bg-[#12344d] text-white transition-all duration-100",
        "hover:w-[240px]"
      )}
    >
      <Link href={"/learn"}>
        <div
          className={clsx(
            "flex gap-2 items-center mx-[18px] pt-5 transition-all duration-100"
          )}
        >
          <div className={clsx("icon-container")}>
            <GiChampions size={35} />
          </div>
          <div className={clsx("link", "invisible group-hover:visible")}>
            <p className="text-lg font-bold">SkillSnap</p>
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify-between h-[90%]">
        <div className="mt-[60px]">
          {options.map((sidebarOption) => {
            return (
              <SidebarOption {...sidebarOption} key={sidebarOption.label} />
            );
          })}
        </div>
        <div>
          <SidebarOption
            link="/profile"
            label="Profile"
            icon={<Md3P size={25} />}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
