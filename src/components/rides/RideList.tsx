import React from 'react';
import RideCard from "@/components/rides/RidesCard";
import {getRides} from "@/lib/data/rides";

const RidesList = async () => {
    const rides = await getRides();

    return (
        <ol className="divide-y-0 divide-gray-50 text-sm leading-6 lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            {rides && rides.map((ride, index) => (
                // @ts-ignore
                <RideCard ride={ride} key={index}/>
            ))}
        </ol>
    );
};

export default RidesList;
