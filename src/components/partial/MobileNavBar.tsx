"use client";
import {Disclosure} from "@headlessui/react";
import {usePathname} from "next/navigation";
import MobileAuthBlock from "@/components/partial/MobileAuthBlock";

interface MobileNavBarProps {
    navigation: any;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const MobileNavBar = ({navigation}: MobileNavBarProps) => {
    const pathname = usePathname()
    return (
        <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                {navigation.map((item: any, index: number) => (
                    <Disclosure.Button
                        key={index}
                        as="a"
                        href={item.href}
                        className={classNames(
                            pathname === item.href ? 'bg-red-50 border-indigo-500 text-red-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-red-700',
                            "block mx-4 py-2 pl-3 pr-4 text-base font-medium text-red-700 sm:pl-5 sm:pr-6"
                        )}
                    >
                        {item.name}
                    </Disclosure.Button>
                ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
                <MobileAuthBlock/>
            </div>
        </Disclosure.Panel>
    );
};

export default MobileNavBar;