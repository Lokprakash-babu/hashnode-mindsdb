"use client";
import { createContext, useEffect, useState } from "react";
import { requestWrapper } from "@/lib/requestWrapper";
import { useAuth } from "@clerk/nextjs";
import RegisterPath from "../Components/Onboarding/RegisterPath";
export const UserContext = createContext<any>(null);
const UserContextProvider = ({ children }) => {
  const [userContextData, setUserContextData] = useState({});
  const [isAccountContextLoading, setIsAccountContextLoading] = useState(false);
  const { userId } = useAuth();
  useEffect(() => {
    if (userId) {
      setIsAccountContextLoading(true);
      requestWrapper(`account?id=${userId}`)
        .then((account) => {
          setUserContextData(account);
        })
        .finally(() => {
          setIsAccountContextLoading(false);
        });
    }
  }, [userId]);

  if (!userId || isAccountContextLoading) {
    return <p>Loading...</p>;
  }
  //@ts-ignore
  if (!userContextData.id && !!userId) {
    return <RegisterPath accountId={userId} />;
  }
  return (
    <>
      {/**@ts-ignore */}
      {userContextData.id && (
        <UserContext.Provider value={userContextData}>
          {children}
        </UserContext.Provider>
      )}
    </>
  );
};

export default UserContextProvider;
