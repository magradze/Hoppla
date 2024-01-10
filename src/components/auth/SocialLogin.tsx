import React from 'react';
import SocialLoginButton from "@/components/auth/SocialLoginButton";

import googleLogo from "@/assets/social/google.svg";
import facebookLogo from "@/assets/social/facebook.svg";
import githubLogo from "@/assets/social/github.svg";

const providers = [
    {
        provider: "google",
        callbackUrl: "/",
        text: "Google",
        icon: googleLogo
    },
    {
        provider: "facebook",
        callbackUrl: "/",
        text: "Facebook",
        icon: facebookLogo
    },
    {
        provider: "github",
        callbackUrl: "/",
        text: "Github",
        icon: githubLogo
    }
];

const SocialLogin = () => {
    return (
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center mt-6">
            {providers.map((provider) => (
                <SocialLoginButton
                    key={provider.provider}
                    provider={provider.provider}
                    callbackUrl={provider.callbackUrl}
                    text={provider.text}
                    icon={provider.icon}
                />
            ))}
        </div>
    );
};

export default SocialLogin;
