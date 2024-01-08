"use client"

import * as React from "react"
import {signOut} from "next-auth/react";
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import Link from "next/link";
import {BellIcon} from "@heroicons/react/24/outline";
import avatarImage from '@/assets/avatar.png'
import {useCurrentUser, useCurrentRole} from "@/hooks";
import {CheckIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Button as NextUIButton} from "@nextui-org/react";
import LoginButton from "@/components/auth/LoginButton";
import {Badge} from "@nextui-org/react";
import {Avatar} from "@nextui-org/avatar";
import {cn} from "@/lib/utils";

const userNavigation = [
    {name: 'პირადი კაბინეტი', href: '/profile'},
    {name: 'პარამეტრები', href: '#'},
]

const AuthBlock = () => {
    const user = useCurrentUser()
    const role: string | null | undefined = useCurrentRole()

    return (
        <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
            <div className="flex flex-row">
                <div className="flex flex-row">
                    {!user && (
                        <LoginButton mode={"modal"} redirectUrl={"/auth/signin"}>
                            <Button
                                variant="default"
                            >
                                ავტორიზაცია
                            </Button>
                        </LoginButton>
                    )}
                    {user && (
                        <div className="flex items-center">

                            <Badge content="99+" shape="circle" color="danger" size="sm">
                                <NextUIButton
                                    radius="sm"
                                    isIconOnly
                                    aria-label="more than 99 notifications"
                                    variant="light"
                                >
                                    <BellIcon width={24}/>
                                </NextUIButton>
                            </Badge>
                            <Menu as="div" className="relative ml-6">
                                <div>
                                    <Menu.Button
                                        className="relative flex rounded-md bg-white text-sm">
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">Open user menu</span>

                                        <Badge
                                            isOneChar
                                            content={<CheckIcon size={16}/>}
                                            size="sm"
                                            color="success"
                                            placement="bottom-right"
                                            variant="solid"
                                            shape="circle"
                                        >
                                            <Avatar
                                                isBordered={role === "USER" && true}
                                                color="success"
                                                radius="sm"
                                                // @ts-ignore
                                                src={user?.image || avatarImage}
                                                size="sm"
                                            />
                                        </Badge>

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
                                        className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item, index) => (
                                            <Menu.Item key={index}>
                                                {({active}: { active: boolean }) => (
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
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
                                                    className={cn(
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                    )}
                                                >
                                                    გასვლა
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AuthBlock