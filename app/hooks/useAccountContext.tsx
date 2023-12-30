import { useContext } from "react";
import { UserContext } from "../Providers/UserContextProvider";


const useAccountContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export default useAccountContext;
