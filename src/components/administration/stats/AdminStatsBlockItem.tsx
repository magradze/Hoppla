"use client"
import React from 'react';
import {
    LineChart,
    Line,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar, Scatter, ScatterChart,
} from 'recharts';
import {cn} from "@/lib/utils";
import {EarningTooltip, RidesTooltip, UserTooltip} from "@/components/administration/stats/StatBlockTooltips";
import {BarChart2} from "lucide-react";

type AdminStatsBlockItemProps = {
    data: any;
}

const AdminStatsBlockItem = ({data}: AdminStatsBlockItemProps) => {
    const userBlock = data?.title.toString().toLowerCase() === 'users';
    const ridesBlock = data?.title.toString().toLowerCase() === 'rides';
    const earningsBlock = data?.title.toString().toLowerCase() === 'earnings';
    const carsBlock = data?.title.toString().toLowerCase() === 'cars';
    const ratingsBlock = data?.title.toString().toLowerCase() === 'ratings';

    const payload = data?.chart?.data.map((item: any) => {
        return {
            name: item.title,
            value: item.count
        }
    })

    return (
        <div
            className={cn(`bg-white overflow-hidden shadow rounded-lg`, userBlock ? 'row-span-2' : '')}>
            <div className="px-4 py-5 sm:p-6 flex flex-row gap-2 justify-between items-start">
                <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                        {data?.title}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        {data?.value}

                    </dd>
                </dl>
                <dl className="flex flex-col justify-end items-end">
                    <dt className={cn("text-xs truncate", data?.compare?.status === "increase" ? "text-lime-500" : "text-rose-800")}>
                        {data?.compare?.percent}
                    </dt>
                    <dd className={cn("mt-1 text-xs text-gray-900 w-56 h-16", userBlock && "h-56")}>
                        <ResponsiveContainer className={cn("w-full h-44", userBlock && "h-full")}>
                            {
                                ridesBlock ?
                                    <LineChart
                                        data={data?.chart?.data}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <Tooltip content={<RidesTooltip external/>}/>
                                        <Line type="monotone" dataKey="count" stroke={data?.chart?.color}/>
                                    </LineChart>
                                    : userBlock ?
                                        <BarChart
                                            width={500}
                                            height={300}
                                            data={data?.chart?.data}
                                        >
                                            <Tooltip content={<UserTooltip external/>}/>
                                            <Bar dataKey="count.male" name="Male" fill={data?.chart?.color}/>
                                            <Bar dataKey="count.female" name="Female" fill={data?.chart?.color2}/>
                                        </BarChart>
                                        : earningsBlock ?
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={data?.chart?.data}
                                            >
                                                <Tooltip content={<EarningTooltip external/>}/>
                                                <Bar dataKey="count" name={data?.title} fill={data?.chart?.color}/>
                                            </BarChart>
                                            : carsBlock ?
                                                <LineChart
                                                    width={500}
                                                    height={300}
                                                    data={data?.chart?.data}
                                                >
                                                    <Tooltip payload={payload}/>
                                                    <Line type="monotone" name={data?.title} dataKey="count"
                                                          stroke={data?.chart?.color}
                                                          activeDot={{r: 8}}/>
                                                </LineChart>
                                                : ratingsBlock ?
                                                    <ScatterChart
                                                        data={data?.chart?.data}
                                                    >

                                                        <Tooltip payload={payload}/>
                                                        <Scatter name={data?.title} dataKey="count"
                                                                 fill={data?.chart?.color}
                                                                 shape="star"/>
                                                    </ScatterChart>
                                                    : <LineChart
                                                        data={data?.chart?.data}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <Tooltip payload={payload}/>
                                                        <Line type="monotone" dataKey="count" stroke={data?.chart?.color}/>
                                                    </LineChart>
                            }
                        </ResponsiveContainer>
                    </dd>
                </dl>
            </div>
        </div>
    );
};

export default AdminStatsBlockItem;

