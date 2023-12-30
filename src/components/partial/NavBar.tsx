"use client"
import {Disclosure} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {PlusIcon} from '@heroicons/react/20/solid'
import AuthBlock from "@/components/partial/AuthBlock";

import hopplaLogo from '@/assets/hoppla.png'
import Image from "next/image";
import NavLink from "@/components/shared/navigation/NavLink";
import MobileNavBar from "@/components/partial/MobileNavBar";
import Link from "next/link";

const navigation = [
    {name: 'მსუბუქი ავტომობილები', href: '/carpool'},
    {name: 'მინიბუსები', href: '/minibus'},
    {name: 'ავტობუსები', href: '/bus'},
]

const Navbar = () => {
    return (
        <>
            <Disclosure as="nav" className="bg-white shadow">
                {({open}: { open: boolean }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between">
                                <div className="flex">
                                    <div className="-ml-2 mr-2 flex items-center lg:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button
                                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="absolute -inset-0.5"/>
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    <div className="flex flex-shrink-0 items-center">
                                        <Link href="/">
                                            <>
                                                <Image
                                                    src={hopplaLogo}
                                                    alt="Hoppla"
                                                    width={130}
                                                    height={20}
                                                    priority
                                                />
                                            </>
                                        </Link>
                                    </div>
                                    <div className="hidden md:ml-6 lg:flex md:space-x-8 alk-sanet">
                                        {navigation.map((item, index) => (
                                            <NavLink key={index} name={item.name} href={item.href}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center alk-sanet">
                                    <div className="flex-shrink-0">
                                        <Link href="/trip/add"
                                              className="relative inline-flex items-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm  text-secondary hover:bg-secondary/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:bg-secondary/10 sm:text-sm"
                                        >
                                            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true"/>
                                            <span
                                                className="pt-0.5 hidden lg:block">მოგზაურობის გამოქვეყნება</span>
                                        </Link>
                                    </div>

                                    <AuthBlock/>
                                </div>
                            </div>
                        </div>
                        <MobileNavBar navigation={navigation}/>
                    </>
                )}
            </Disclosure>
        </>
    )
}

export default Navbar