"use client";
import * as React from "react";
import {PageHeader, TripCalendar, TripCard} from "@/components/shared";
import carpoolBg from "@/assets/carpoolbg.svg";

const CarPool = () => {

    const [rides, setRides] = React.useState([])

    React.useEffect(() => {
        fetch('/api/rides')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setRides(data)
            })
    }, [])

    return (
        <div className="relative isolate  z-10">
            <PageHeader image={carpoolBg} text="მსუბუქი ავტომობილები"/>
            <div className="page-wrapper">
                <h2 className="text-base font-semibold leading-6 text-gray-900 alk-sanet">დღევანდელი მარშრუტები</h2>
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                    <div
                        className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                        <TripCalendar/>
                        <div>...</div>
                    </div>
                    <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                        {rides.map((ride, index) => (
                            <TripCard ride={ride} key={index}/>
                        ))}
                    </ol>
                </div>

            </div>
        </div>
    );
};

export default CarPool;