import React from 'react';
import AdminStatsBlockItem from "@/components/administration/stats/AdminStatsBlockItem";
import {getStatsAdmin} from "@/lib/actions/stats";

const AdminStatsBlock = async () => {
    const statistics = await getStatsAdmin();

    return (
        <dl className="col-span-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 fira-go">
            {
                statistics?.map((item: any, index: number) => (
                    <AdminStatsBlockItem key={index} data={item}/>
                ))
            }
        </dl>
    )
        ;
};

export default AdminStatsBlock;
