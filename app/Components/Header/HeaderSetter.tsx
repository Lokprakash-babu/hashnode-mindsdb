"use client";

import { useEffect } from "react";
import { useHeaderContext } from "./HeaderContextProvider";

const HeaderSetter = ({ title }) => {
  const { setHeaderTitle } = useHeaderContext();
  useEffect(() => {
    setHeaderTitle(title);
  }, [title]);
  return null;
};

export default HeaderSetter;
