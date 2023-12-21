import {signIn, signOut, useSession} from "next-auth/react";
import {BellIcon} from "@heroicons/react/24/outline";
import {Disclosure} from "@headlessui/react";
import Image from "next/image";
import * as React from "react";

const userNavigation = [
    {name: 'Your Profile', href: '#'},
    {name: 'Settings', href: '#'},
]


const MobileAuthBlock = () => {
    const {data: session} = useSession();
    return (
        <>
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
                    <div className="flex items-center px-4 sm:px-6">
                        <div className="flex-shrink-0">
                            <Image
                                className="h-8 w-8 rounded-full"
                                src={session?.user?.image || "https://via.placeholder.com/150"}
                                alt={session?.user?.name || "User"}
                                width={32}
                                height={32}
                            />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-gray-800">{session?.user?.name}</div>
                            <div className="text-sm font-medium text-gray-500">{session?.user?.email}</div>
                        </div>
                        <button
                            type="button"
                            className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute -inset-1.5"/>
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-3 space-y-1">
                        {userNavigation.map((item, index) => (
                            <Disclosure.Button
                                key={index}
                                as="a"
                                href={item.href}
                                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                            >
                                {item.name}
                            </Disclosure.Button>
                        ))}
                        <Disclosure.Button
                            as="a"
                            onClick={() => signOut()}
                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6 cursor-pointer"
                        >
                            Sign out
                        </Disclosure.Button>
                    </div>
                </>
            )}
        </>
    )
};

export default MobileAuthBlock;