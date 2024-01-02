"use client";
import * as React from "react";
import {PageHeader, TripCalendar, TripCard} from "@/components/shared";
import carpoolBg from "@/assets/carpoolbg.svg";
import RidesNotFound from "@/components/rides/RidesNotFound";

const CarPool = () => {

    const [rides, setRides] = React.useState([])

    React.useEffect(() => {
        fetch('/api/rides')
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setRides(data)
                }
            }).catch((err) => {
            throw new Error(err)
        })
    }, [])

    return (
        <div className="relative isolate z-10">
            <PageHeader image={carpoolBg} text="მსუბუქი ავტომობილები"/>
            <div className="page-wrapper">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
                    <div
                        className="text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 xl:col-start-9">
                        <TripCalendar/>
                        <div>...</div>
                    </div>
                    <ol className="divide-y-0 divide-gray-50 text-sm leading-6 lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
                        {rides.length === 0 ? <RidesNotFound/> : rides.map((ride, index) => (
                            <TripCard ride={ride} key={index}/>
                        ))}
                    </ol>
                </div>

            </div>
        </div>
    );
};

export default CarPool;