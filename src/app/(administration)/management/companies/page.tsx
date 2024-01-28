import {FC} from "react";
import {getUsers} from "@/lib/actions/user";
import {cn} from "@/lib/utils";
import CompanyTables from "@/components/administration/tables/CompanyTables";
import {Space} from "lucide-react";

interface pageProps {
}

const page: FC<pageProps> = async () => {
    const users = await getUsers();

    const columns = [
        {
            name: 'Name',
            uid: 'name',
            sortable: true
        },
        {
            name: 'Email',
            uid: 'email',
            sortable: true
        },
        {
            name: 'Phone',
            uid: 'phone',
            sortable: true
        },
        {
            name: 'Role',
            uid: 'role',
            sortable: true
        },
        {
            name: 'Status',
            uid: 'status',
            sortable: true
        },
        {
            name: 'Actions',
            uid: 'actions',
            sortable: false,
            // render: () => <Space size={24} />
        }
    ]

    return (
        <div className="flex flex-col w-full h-full">
            <div className={cn("px-4  bg-white rounded-xl shadow-md")}>
                Company
            </div>
            <div className={cn("mt-12 fira-go")}>
                <CompanyTables users={users} columns={columns}/>
            </div>
        </div>
    );
}

export default page;