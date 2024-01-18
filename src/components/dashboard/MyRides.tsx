import React from 'react';
import RideCard from "@/components/rides/RidesCard";
import RidesNotFound from "@/components/rides/RidesNotFound";
import {IRidesCard} from "@/interfaces/IRidesCard";

interface IMyRides {
    rides: any
}

const MyRides = ({rides}: IMyRides) => {
    return (
        <div>
            <div className="flex flex-col gap-2 fira-go my-4">
                <h2 className="font-bold text-xl text-secondary">ჩემი მგზავრობები</h2>
            </div>
            <div className="divide-y-0 divide-gray-50 text-sm leading-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {rides?.length ? rides.map((ride: IRidesCard, index: number) => (
                    <RideCard key={index} {...ride}/>
                )) : <RidesNotFound/>}
            </div>
        </div>
    );
};

export default MyRides;
