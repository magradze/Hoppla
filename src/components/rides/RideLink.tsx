import React from 'react';
import {getRideLinks} from "@/lib/actions/rides";
import Link from "next/link";

const RideLink = async () => {

    const rideLinks = await getRideLinks()
    return (
        <>
            {rideLinks?.slice(0, 6).map((ride: any, index: number) => (
                <li key={index}>
                    <Link href={`/search?from=${ride.rideFrom}&to=${ride.rideTo}&date=${ride.rideDate}&seats=1`}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900 alk-sanet">
                        {ride.rideName}
                    </Link>
                </li>
            ))}
        </>
    );
};

export default RideLink;
