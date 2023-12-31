"use client";
import { createContext, useEffect, useState } from "react";
import { requestWrapper } from "@/lib/requestWrapper";
export const UserContext = createContext<any>(null);
const UserContextProvider = ({ children }) => {
  const [userContextData, setUserContextData] = useState({});
  // Todo move to user email after auth logic
  useEffect(() => {
    // session?.user &&
    requestWrapper(`/account?email=devlokprakash100@gmail.com`, {
      cache: "no-store",
    }).then((account) => setUserContextData(account));
  }, []);

  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
