import {FC} from "react";
import {getServerSession} from "next-auth";
import {getUserByEmail} from "@/lib/data/user";
import SidebarMenu from "@/components/dashboard/SidebarMenu";
import EditableInput from "@/components/dashboard/inputs/EditableInput";
import EditProfileForm from "@/components/dashboard/forms/EditProfileForm";

interface pageProps {
}


const page: FC<pageProps> = async () => {

    const session = await getServerSession()

    if (!session) return null

    const user = await getUserByEmail(session?.user?.email as string)

    return (
        <div className="page-wrapper pt-8 lg:flex lg:gap-x-16 lg:px-8 alk-sanet">
            <SidebarMenu/>
            <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">პროფილი</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">
                            ეს ინფორმაცია საჯაროდ გამოჩნდება, ამიტომ ფრთხილად იყავით რას აზიარებთ.
                        </p>

                        <EditProfileForm user={user}/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default page;