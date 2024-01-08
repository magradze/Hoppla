import {FC} from "react";
import {Fingerprint, User, Bell, Box, CreditCard, Users} from "lucide-react";
import {cn} from "@/lib/utils";
import {getServerSession} from "next-auth";
import {getUserByEmail} from "@/lib/data/user";

interface pageProps {
}

const secondaryNavigation = [
    {name: 'General', href: '#', icon: User, current: true},
    {name: 'Security', href: '#', icon: Fingerprint, current: false},
    {name: 'Notifications', href: '#', icon: Bell, current: false},
    {name: 'Plan', href: '#', icon: Box, current: false},
    {name: 'Billing', href: '#', icon: CreditCard, current: false},
    {name: 'Team members', href: '#', icon: Users, current: false},
]

const page: FC<pageProps> = async () => {

    const session = await getServerSession()

    if (!session) return null

    const user = await getUserByEmail(session?.user?.email as string)

    return (
        <div className="page-wrapper pt-8 lg:flex lg:gap-x-16 lg:px-8 alk-sanet">
            <aside
                className="flex overflow-x-auto border-b border-gray-900/5 lg:block lg:w-64 lg:flex-none lg:border-0">
                <nav className="flex-none px-4 sm:px-6 lg:px-0">
                    <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                        {secondaryNavigation.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={cn(
                                        item.current
                                            ? 'bg-gray-50 text-primary'
                                            : 'text-secondary hover:text-secondary hover:bg-gray-50',
                                        'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            item.current ? 'text-primary' : 'text-gray-400 group-hover:text-secondary',
                                            'h-6 w-6 shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                            <div className="pt-6 sm:flex">
                                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                    <div className="text-gray-900">{user?.name}</div>
                                    <button type="button"
                                            className="font-semibold text-secondary hover:text-indigo-500">
                                        Update
                                    </button>
                                </dd>
                            </div>
                            <div className="pt-6 sm:flex">
                                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address
                                </dt>
                                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                    <div className="text-gray-900">{user?.email}</div>
                                    <button type="button"
                                            className="font-semibold text-secondary hover:text-indigo-500">
                                        Update
                                    </button>
                                </dd>
                            </div>
                            <div className="pt-6 sm:flex">
                                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Title</dt>
                                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                    <div className="text-gray-900">Human Resources Manager</div>
                                    <button type="button"
                                            className="font-semibold text-secondary hover:text-indigo-500">
                                        Update
                                    </button>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Bank accounts</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">Connect bank accounts to your account.</p>

                        <ul role="list"
                            className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                            <li className="flex justify-between gap-x-6 py-6">
                                <div className="font-medium text-gray-900">TD Canada Trust</div>
                                <button type="button" className="font-semibold text-secondary hover:text-indigo-500">
                                    Update
                                </button>
                            </li>
                            <li className="flex justify-between gap-x-6 py-6">
                                <div className="font-medium text-gray-900">Royal Bank of Canada</div>
                                <button type="button" className="font-semibold text-secondary hover:text-indigo-500">
                                    Update
                                </button>
                            </li>
                        </ul>

                        <div className="flex border-t border-gray-100 pt-6">
                            <button type="button"
                                    className="text-sm font-semibold leading-6 text-secondary hover:text-indigo-500">
                                <span aria-hidden="true">+</span> Add another bank
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Integrations</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">Connect applications to your account.</p>

                        <ul role="list"
                            className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                            <li className="flex justify-between gap-x-6 py-6">
                                <div className="font-medium text-gray-900">QuickBooks</div>
                                <button type="button" className="font-semibold text-secondary hover:text-indigo-500">
                                    Update
                                </button>
                            </li>
                        </ul>

                        <div className="flex border-t border-gray-100 pt-6">
                            <button type="button"
                                    className="text-sm font-semibold leading-6 text-secondary hover:text-indigo-500">
                                <span aria-hidden="true">+</span> Add another application
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default page;