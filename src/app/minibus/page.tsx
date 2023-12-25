"use client";
import React from 'react';
import {TripCalendar, TripCard} from "@/components/shared";
import Image from "next/image";
import carpoolBg from "@/assets/carpoolbg.svg";
import {PageHeader} from "@/components/shared";

const Minibus = () => {
    return (
        <div className="relative isolate z-10">
            <PageHeader image={carpoolBg} text="მინიბუსები"/>
            <div className="max-w-7xl mx-auto py-8 px-8">
                <h2 className="text-base font-semibold leading-6 text-gray-900 alk-sanet">მინიბუსები</h2>
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                    <div
                        className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                        <TripCalendar/>
                        <div>...</div>
                    </div>
                    <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                        დდ
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Minibus;
