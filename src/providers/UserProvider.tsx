"use client"
import UserContext from "@/context/userContext";
import {ReactNode} from "react";
import {User} from "next-auth";
import {useSession} from "next-auth/react";

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider = ({children}: UserProviderProps) => {
    const {data: session} = useSession()
    const value = session?.user as User

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;