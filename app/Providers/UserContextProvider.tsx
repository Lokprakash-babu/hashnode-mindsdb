"use client";
import { createContext, useEffect, useState } from "react";
import { requestWrapper } from "@/lib/requestWrapper";
import { useAuth } from "@clerk/nextjs";
import RegisterPath from "../Components/Onboarding/RegisterPath";
import UserContextLoader from "../Components/UserContextLoader";
export const UserContext = createContext<any>(null);
const UserContextProvider = ({ children }) => {
  const [userContextData, setUserContextData] = useState({
    data: null,
    loading: null,
    err: null,
  });
  const { userId, isLoaded } = useAuth();
  useEffect(() => {
    if (userId) {
      setUserContextData({
        ...userContextData,
        //@ts-ignore
        loading: true,
      });
      requestWrapper(`account?id=${userId}`)
        .then((account) => {
          setUserContextData({
            data: account,
            //@ts-ignore
            loading: false,
            err: null,
          });
        })
        .catch((err) => {
          console.log("error", err);
          setUserContextData({
            ...userContextData,
            err: err,
            //@ts-ignore
            loading: false,
          });
        });
    }
  }, [userId]);

  if (!userId || userContextData.loading || !isLoaded) {
    return <UserContextLoader />;
  }

  if (
    //@ts-ignore
    !userContextData?.data?.id &&
    userId &&
    isLoaded &&
    userContextData.loading !== null
  ) {
    return <RegisterPath accountId={userId} />;
  }
  return (
    <>
      {/**@ts-ignore */}
      {userContextData?.data?.id && (
        <UserContext.Provider value={userContextData.data}>
          {children}
        </UserContext.Provider>
      )}
    </>
  );
};

export default UserContextProvider;
