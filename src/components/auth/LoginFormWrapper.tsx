import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {CheckIcon} from "lucide-react";
import OrDivider from "@/components/shared/dividers/OrDivider";
import LoginWithGoogle from "@/components/auth/SocialLoginButton";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";

interface LoginFormWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    headerDescription?: string;
    buttonText: string;
    buttonHref: string;
    showSocialButtons?: boolean;
}

const LoginFormWrapper = ({
                              children,
                              headerLabel,
                              headerDescription,
                              buttonText,
                              buttonHref,
                              showSocialButtons
                          }: LoginFormWrapperProps) => {
    return (
        <>
            <Card className="w-full mt-8">
                <CardHeader>
                    <CardTitle>{headerLabel}</CardTitle>
                    <CardDescription>{headerDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>

                {showSocialButtons && (
                    <>
                        <OrDivider/>
                        <SocialLogin/>
                        <div className="flex items-center justify-center lg:justify-end mt-6">
                            <div className="flex items-center">
                                <div className="text-sm">
                                    <Link href={buttonHref}
                                          className="font-medium text-secondary hover:text-secondary fira-go">
                                        {buttonText}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Card>

        </>
    );
};

export default LoginFormWrapper;
