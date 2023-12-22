"use client"
import React, {FormEvent, useRef} from 'react';
import {signIn} from "next-auth/react";
import Image from "next/image";
import carPoolImage from "@/assets/carpool.svg";

const Login = () => {

    const email = useRef("");
    const password = useRef("");
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn("credentials", {
            redirect: true,
            email: email.current,
            password: password.current,
            callbackUrl: "/"
        })
    };

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-8 px-8">
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <Image src={carPoolImage} alt={"Car Pool Image"} width={500} height={500} priority={true}/>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full md:w-96">
                        <h1 className="text-3xl font-bold">Welcome Back</h1>
                        <p className="text-gray-500 mt-4">Please enter your credentials to proceed.</p>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <input type="hidden" name="remember" defaultValue="true"/>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input id="email-address" name="email" type="email" autoComplete="email"
                                           required
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                                           placeholder="Email address"
                                           onChange={(e) => (email.current = e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input id="password" name="password" type="password" autoComplete="current-password"
                                           required
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                                           placeholder="Password"
                                           onChange={(e) => (password.current = e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox"
                                           className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"/>
                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-secondary hover:text-secondary">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button type="submit"
                                        className="group relative w-full flex justify-center py-2  items-center gap-x-1.5 rounded-md px-3 text-sm font-semibold text-white bg-secondary/90 hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Sign in
                                </button>
                            </div>
                        </form>

                        {/* or divide line */}
                        <div className="flex items-center justify-center mt-6">
                            <div className="flex-grow border-t border-gray-300"/>
                            <div className="px-3 text-gray-500 text-sm">or</div>
                            <div className="flex-grow border-t border-gray-300"/>
                        </div>

                        <div className="flex items-center justify-center mt-6">

                            <button
                                className="relative flex justify-center items-center gap-x-1.5 w-full rounded-md bg-secondary/10 px-3 py-2 text-sm font-semibold text-secondary hover:bg-secondary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                                Sign in with Google
                            </button>

                        </div>
                        <div className="flex items-center justify-center mt-6">
                            <div className="flex items-center">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-secondary hover:text-secondary">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        Don't have an account?
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
