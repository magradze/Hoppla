"use client"

import * as React from "react"
import {signIn, signOut, useSession} from "next-auth/react";

const AuthBlock = () => {
    const {data: session} = useSession();

    return (
        <div className="flex flex-row">
            <div className="flex flex-row">
                {!session && (
                    <>
                        <button
                            className="rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                            onClick={() => signIn()}
                        >
                            Sign in
                        </button>
                    </>
                )}
                {session && (
                    <>
                        <span className="text-white px-4 py-2">
                            {session.user.email}
                        </span>
                        <button
                            className="rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                            onClick={() => signOut()}
                        >
                            Sign out
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default AuthBlock