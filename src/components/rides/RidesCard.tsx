import React from 'react';
import {IRide} from "@/interfaces/IRide";
import Image from "next/image";
import {Diamond, Dot, SquareDot, SquareStack, Waypoints} from "lucide-react";
import CarSeat from "@/components/shared/icons/CarSeat";
import rideCardBg from "@/assets/ride-card-bg.svg";
import {convertSeconds} from "@/lib/tools/convertSeconds";

const RideCard = ({ride: ride}: IRide) => {

    const startTime = new Date(ride.startDate).getHours() * 3600 + new Date(ride.startDate).getMinutes() * 60

    const arrivalTime = startTime + ride.duration

    const arrivalHour = convertSeconds(parseInt(String(arrivalTime)))
    const rideDuration = convertSeconds(parseInt(String(ride.duration)))

    return (
        <li className="relative bg-white border border-gray-100 w-full rounded-md flex flex-col overflow-hidden hover:shadow-2xl cursor-pointer group">
            <Image
                src={rideCardBg} alt={ride.startLocation}
                layout="fill"
                objectFit="cover"
                className="z-0 opacity-10"
            />
            <div className="flex flex-row justify-between">
                <div className="flex flex-row space-x-6 p-4">
                    <div className="flex flex-col justify-between space-y-4">
                        <div className="flex flex-col">
                        <span className="text-lg lg:text-xl font-semibold alk-sanet">
                            {new Date(ride.startDate).toLocaleTimeString(
                                'ka-GE',
                                {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: false
                                }
                            )}
                        </span>
                            <small className="text-gray-400 text-sm lg:text-md">
                                {rideDuration}
                            </small>
                        </div>
                        <div className="text-lg lg:text-xl font-semibold alk-sanet">{arrivalHour}</div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                            <SquareDot className="text-primary"/>
                            <h3 className="text-md lg:text-xl font-bold alk-sanet">
                                {ride.startLocation}
                            </h3>
                        </div>
                        <div
                            className="flex items-center gap-2 text-gray-400 group-hover:text-red-600 transform transition-all duration-300">
                            <Waypoints/>
                            <h3 className="text-sm alk-sanet">
                                {ride.stops.length} <small> გაჩერება</small>
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <SquareDot className="text-primary"/>
                            <h3 className="text-md lg:text-xl font-bold alk-sanet">
                                {ride.endLocation}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <span
                        className="bg-red-700/10 text-primary text-md lg:text-xl font-bold p-2 rounded-md">{ride.price / ride.places} ₾</span>
                </div>
            </div>
            <div className="flex flex-row justify-between bg-white border-t border-gray-100 p-4 items-center z-10">
                <div className="flex flex-row space-x-4">
                    <div className="">
                        <Image
                            className="w-8 h-8 lg:w-12 lg:h-12 rounded-md"
                            src={ride?.driver?.image}
                            alt="avatar"
                            width={42}
                            height={42}
                        />
                    </div>
                    <div className="flex flex-col -space-y-2 lg:space-y-0">
                        <div
                            className="text-sm lg:text-md font-medium text-gray-600 alk-sanet">{ride.driver.name}</div>
                        <div className="text-[10px] lg:text-xs text-gray-400">{"BMW X5"}</div>
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    {
                        //draw icons based on the number of seats
                        [...Array(ride.places)].map((e, i) => <CarSeat key={i} className="w-6 h-6 text-gray-400"/>)
                    }
                </div>
            </div>
        </li>
    );
};

export default RideCard;
