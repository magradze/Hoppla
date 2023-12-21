"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

interface NavLinkProps {
    href: string;
    name: string;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const NavLink = ({href, name}: NavLinkProps) => {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={classNames(
                pathname === href ? 'text-gray-900 border-b-2 border-red-700' : 'text-gray-500 hover:text-gray-900',
                "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            )}
            aria-current={pathname === href ? 'page' : undefined}
        >
            {name}
        </Link>
    )
}

export default NavLink;