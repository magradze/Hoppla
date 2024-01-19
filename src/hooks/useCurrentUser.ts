import UserContext from "@/context/userContext";
import {useContext} from "react";

const useCurrentUser = () => useContext(UserContext)

export default useCurrentUser;