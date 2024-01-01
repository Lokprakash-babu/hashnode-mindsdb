"use client";
import { createContext, useEffect, useState } from "react";
import { requestWrapper } from "@/lib/requestWrapper";
import { useUser } from "@clerk/nextjs";
export const UserContext = createContext<any>(null);
const UserContextProvider = ({ children }) => {
  const [userContextData, setUserContextData] = useState({});
  const [isAccountContextLoading, setIsAccountContextLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  console.log("user", user);
  const userEmailAddress = user?.primaryEmailAddress?.emailAddress;
  useEffect(() => {
    console.log("use effect user context", isSignedIn, isLoaded);
    if (isSignedIn && isLoaded) {
      setIsAccountContextLoading(true);
      requestWrapper(`/account?email=${userEmailAddress}`, {
        cache: "no-store",
      })
        .then((account) => {
          setUserContextData(account);
        })
        .finally(() => {
          setIsAccountContextLoading(false);
        });
    }
  }, [isSignedIn, isLoaded]);

  if (!isSignedIn || !isLoaded || isAccountContextLoading) {
    return <p>Loading...</p>;
  }
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
