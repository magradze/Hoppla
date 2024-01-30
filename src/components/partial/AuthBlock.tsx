"use client"

import * as React from "react"
import {Menu} from "@headlessui/react";
import {BellIcon} from "@heroicons/react/24/outline";
import avatarImage from '@/assets/avatar.png'
import {useCurrentUser, useCurrentRole} from "@/hooks";
import {CheckIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Button as NextUIButton} from "@nextui-org/react";
import LoginButton from "@/components/auth/LoginButton";
import {Badge} from "@nextui-org/react";
import {Avatar} from "@nextui-org/avatar";
import DropDownMenu from "@/components/shared/navigation/DropDownMenu";

const userNavigation = [
    {name: 'ადმინისტრაცია', href: '/management'},
    {name: 'პირადი კაბინეტი', href: '/dashboard'},
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

                                <DropDownMenu userNavigation={userNavigation} role={role}/>
                            </Menu>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AuthBlock