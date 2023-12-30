"use client";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { requestWrapper } from "@/lib/requestWrapper";
export const UserContext = createContext<any>(null);
const UserContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [userContextData, setUserContextData] = useState({});

  useEffect(() => {
    session?.user &&
      requestWrapper(`/account?email=${session?.user?.email}`, {
        cache: "no-store",
      }).then((account) => setUserContextData(account));
  }, [session]);

  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
