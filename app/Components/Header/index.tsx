"use client";
import clsx from "clsx";
import { useHeaderContext } from "./HeaderContextProvider";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  const { headerTitle } = useHeaderContext();
  return (
    <header
      className={clsx(
        "flex justify-between w-full pl-[90px] h-[60px] max-h-[60px] bg-white border-b border-b-[#d4d4d8] py-5 pr-4"
      )}
    >
      <div className="page-name-container">
        <h1 className={clsx("header-1-600")}>{headerTitle}</h1>
      </div>
      <div className="user-icon-container flex gap-2">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};

export default Header;
