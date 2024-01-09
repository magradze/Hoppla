import {FC} from "react";
import {getServerSession} from "next-auth";
import SidebarMenu from "@/components/dashboard/SidebarMenu";
import DashboardStats from "@/components/dashboard/Stats";

interface pageProps {
}


const page: FC<pageProps> = async () => {

    const session = await getServerSession()

    if (!session) return null

    return (
        <div className="page-wrapper pt-8 lg:flex lg:gap-x-2 lg:px-8 alk-sanet">
            <SidebarMenu/>
            <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                    <div>
                        <DashboardStats/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default page;