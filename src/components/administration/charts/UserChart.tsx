"use client"
import React from 'react';
import {
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar, Rectangle, LabelList
} from 'recharts';

type UserChartProps = {
    statistics: object[] | any;
}

const UserChart = ({statistics}: UserChartProps) => {
    return (
        <div className="fira-go p-4 relative block w-full h-96">
            <ResponsiveContainer className="w-full h-full">
                <BarChart
                    title="მომხმარებლები"

                    width={500}
                    height={300}
                    data={statistics[2]?.chart?.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <Tooltip content={<CustomizedTooltip external/>}/>
                    <Legend verticalAlign="top" height={36} iconType="circle"/>
                    <Bar name="კაცი" dataKey="count.male" fill={statistics[2]?.chart?.color}
                         activeBar={<Rectangle fill={statistics[2]?.chart?.color}/>}>
                        <LabelList dataKey="name" position="top"/>
                    </Bar>
                    <Bar name="ქალი" dataKey="count.female" fill={statistics[2]?.chart?.color2}
                         activeBar={<Rectangle fill={statistics[2]?.chart?.color2}/>}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserChart;


const CustomizedTooltip = ({active, payload, external}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md rounded-md p-2">
                <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
                <p className="label">{`${payload[1].name} : ${payload[1].value}`}</p>
            </div>
        );
    }

    return null;
}