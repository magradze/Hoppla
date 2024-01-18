import React from 'react';
import {getRideLinks} from "@/lib/actions/rides";
import moment from "moment/moment";
import Link from "next/link";

const DailyRides = async () => {
        const rides = await getRideLinks()

        return (
            <div className="grid grid-cols-4 gap-4 py-8">
                {rides?.slice(0, 4).map((ride: any, index: number) => (
                    <div key={index}
                         className="bg-white rounded-xl border border-gray-100 hover:shadow-2xl alk-sanet">
                        <Link
                            href={`/search?from=${ride.rideFrom}&to=${ride.rideTo}&date=${moment(new Date()).format("YYYY-MM-DD")}&seats=1`}>
                            <div className="flex flex-col justify-center items-center py-8">
                                <div className="flex items-center">

                                    <div className="text-lg font-semibold">{ride.rideName}</div>
                                </div>
                                <div className="text-gray-400 text-sm">
                                    {ride.rideCount} მარშუტი
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
;

export default DailyRides;
