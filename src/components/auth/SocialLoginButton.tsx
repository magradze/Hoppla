import React from 'react';
import {signIn} from "next-auth/react";
import {Button} from "@/components/ui/button";
import Image from "next/image";

interface SocialLoginButtonProps {
    provider: string;
    callbackUrl: string;
    text: string;
    icon: string;
}

const SocialLoginButton = ({
                               provider,
                               callbackUrl,
                               text,
                               icon
                           }: SocialLoginButtonProps) => {
    return (
        <Button
            variant={provider as any}
            size="lg"
            className={"w-full flex items-center justify-center gap-2"}
            onClick={() => signIn(provider, {callbackUrl: callbackUrl})}
        >
            <Image src={icon} alt={provider} width={24} height={24}/>
            {text}
        </Button>
    );
};

export default SocialLoginButton;
