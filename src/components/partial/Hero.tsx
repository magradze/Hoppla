"use client";
import Image from "next/image";
import {CalendarDays, Locate, MapPin, UserRound} from 'lucide-react';

import carpoolBg from '@/assets/carpoolbg.svg'

const Hero = () => {

    return (
        <div className="bg-gray-900">

            <div className="relative isolate  z-10">
                <Image
                    src={carpoolBg}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="mx-auto max-w-4xl pt-8 ">

                    <div className="text-center min-h-12 lg:min-h-96 flex flex-col justify-between ">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-6xl">
                            Your pick of rides at low prices
                        </h1>
                        <div className="-mt-28 flex items-end gap-x-6">
                            <div
                                className="bg-white rounded-md mx-4 flex flex-col lg:flex-row lg:justify-between items-center w-full translate-y-32 lg:translate-y-8 shadow shadow-black/20 ">
                                <div className="relative w-full h-16 rounded-md">
                                    <div
                                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <Locate/>
                                    </div>
                                    <input
                                        type="text"
                                        name="from"
                                        id="from"
                                        className="block w-full h-full rounded-t md:rounded-l-md border-0 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        placeholder="Leaving from..."
                                    />
                                </div>
                                <div className="relative w-full h-16 rounded-md">
                                    <div
                                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <MapPin/>
                                    </div>
                                    <input
                                        type="text"
                                        name="going"
                                        id="going"
                                        className="block w-full h-full rounded-none border-0 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        placeholder="Going to..."
                                    />
                                </div>
                                <div className="flex w-full">
                                    <div className="relative w-full h-16 rounded-md">
                                        <div
                                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                            <CalendarDays/>
                                        </div>
                                        <input
                                            type="text"
                                            name="calendar"
                                            id="calendar"
                                            className="block w-full h-full rounded-none border-0 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            placeholder="Today"
                                        />
                                    </div>
                                    <div className="relative w-full h-16 rounded-md">
                                        <div
                                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                            <UserRound/>
                                        </div>
                                        <input
                                            type="text"
                                            name="calendar"
                                            id="calendar"
                                            className="block w-full h-full rounded-none border-0 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            placeholder="1"
                                        />
                                    </div>
                                </div>
                                <div className="relative w-full h-16 rounded-md self-end">
                                    <button
                                        className="bg-indigo-600 block w-full h-full rounded-b lg:rounded-bl-none lg:rounded-r-md border-0 px-24 py-1.5 text-white "
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero