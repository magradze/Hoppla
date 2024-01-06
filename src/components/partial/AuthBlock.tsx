"use client";

import * as React from "react";
import { signIn, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";
import avatarImage from "@/assets/avatar.png";
import { useCurrentUser, useCurrentRole } from "@/hooks";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/LoginButton";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const userNavigation = [
  { name: "პირადი კაბინეტი", href: "#" },
  { name: "პარამეტრები", href: "#" },
];

const AuthBlock = () => {
  const user = useCurrentUser();
  const role: string | null | undefined = useCurrentRole();
  return (
    <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
      <div className="flex flex-row">
        <div className="flex flex-row">
          {!user && (
            <LoginButton mode={"modal"} redirectUrl={"/auth/signin"}>
              <Button variant="default">ავტორიზაცია</Button>
            </LoginButton>
          )}
          {user && (
            <>
              <button
                type="button"
                className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-md"
                      src={user.image || avatarImage}
                      alt={user.name || "User"}
                      width={32}
                      height={32}
                    />
                    {role === "admin" && (
                      <ShieldCheck className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white text-green-400 bg-white" />
                    )}
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
                  <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item, index) => (
                      <Menu.Item key={index}>
                        {({ active }: { active: boolean }) => (
                          <Link
                            href={item.href}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                    {role === "ADMIN" && (
                      <Menu.Item>
                        {({ active }: { active: boolean }) => (
                          <Link
                            href={"/admin"}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            ადმინ პანელი
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }: { active: boolean }) => (
                        <button
                          onClick={() => signOut()}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                          )}
                        >
                          გასვლა
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
  );
};

export default AuthBlock;
