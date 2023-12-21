"use client"

import * as React from "react"
import {signIn, signOut, useSession} from "next-auth/react";
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import Image from "next/image";
import Link from "next/link";
import {BellIcon} from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const userNavigation = [
    {name: 'Your Profile', href: '#'},
    {name: 'Settings', href: '#'},
]

const AuthBlock = () => {
    const {data: session} = useSession();

    return (
        <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
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
                            <button
                                type="button"
                                className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute -inset-1.5"/>
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button
                                        className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">Open user menu</span>
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={session?.user?.image || "https://via.placeholder.com/150"}
                                            alt={session?.user?.name || "User"}
                                            width={32}
                                            height={32}
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item, index) => (
                                            <Menu.Item key={index}>
                                                {({active}: { active: boolean }) => (
                                                    <Link
                                                        href={item.href}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                        <Menu.Item>
                                            {({active}: { active: boolean }) => (
                                                <button
                                                    onClick={() => signOut()}
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                    )}
                                                >
                                                    Sign out
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AuthBlock