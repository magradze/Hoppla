import React from 'react';
import {signIn} from "next-auth/react";
import {Button} from "@/components/ui/button";

const LoginWithGoogle = () => {
    return (
        <Button
            variant="white"
            size="default"
            className={"w-full flex items-center justify-center gap-2"}
            onClick={() => signIn("google", {callbackUrl: "/"})}
        >
            <svg className="w-5 h-5" viewBox="0 0 18 18" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17.64 9.223c0-.64-.057-1.251-.163-1.836H9v3.484h4.84a4.14 4.14 0 0 1-1.793 2.715v2.26h2.91c1.702-1.566 2.683-3.87 2.683-6.623z"
                    fill="#4285F4"/>
                <path
                    d="M9 18c2.43 0 4.46-.797 5.93-2.158l-2.91-2.26c-.803.54-1.83.86-3.02.86-2.32 0-4.28-1.564-4.986-3.66H.957v2.296A8.996 8.996 0 0 0 9 18z"
                    fill="#34A853"/>
                <path
                    d="M4.014 10.7A5.41 5.41 0 0 1 4 9c0-.99.266-1.922.73-2.7V3.004H.957A8.996 8.996 0 0 0 0 9c0 1.45.348 2.824.957 4.04l3.057-2.34z"
                    fill="#FBBC05"/>
                <path
                    d="M9 3.58c1.31 0 2.485.45 3.41 1.33l2.557-2.558C13.46.891 11.43 0 9 0A8.996 8.996 0 0 0 .957 3.004L4.014 5.34A5.41 5.41 0 0 1 9 3.58z"
                    fill="#EA4335"/>
            </svg>
            Google ავტორიზაცია
        </Button>
    );
};

export default LoginWithGoogle;
