"use client"
import React from 'react';
import {useRouter} from 'next/navigation';

interface LoginButtonProps {
    children: React.ReactNode;
    mode: "modal" | "redirect";
    redirectUrl?: string;
    asChild?: boolean;
}

const LoginButton = ({children, mode = "redirect", redirectUrl, asChild}: LoginButtonProps) => {

    const router = useRouter();

    const onClick = () => router.push(redirectUrl || "auth/signin")

    if (mode === "modal") {
        return (
            <div onClick={onClick}>
                {children}
            </div>
        );
    }

    return (
        <div onClick={onClick} className="cursor-pointer">
            {children}
        </div>
    );
};

export default LoginButton;
