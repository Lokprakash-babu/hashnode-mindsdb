"use client";

import { useContext, createContext, useState } from "react";

const HeaderContext = createContext({
  headerTitle: "",
  setHeaderTitle: (args: string) => {},
});

export const useHeaderContext = () => {
  const params = useContext(HeaderContext);
  return {
    ...params,
  };
};
const HeaderContextProvider = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("");

  return (
    <HeaderContext.Provider
      value={{
        headerTitle,
        setHeaderTitle,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContextProvider;
