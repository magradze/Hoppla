"use client";
import Image from "next/image";

import carpoolBg from '@/assets/carpoolbg.svg'
import SearchBox from "@/components/partial/SearchBox";

const Hero = (
    // {
    //     dict
    // }: {
    //     dict: any
    // }
) => {

    return (
        <div className="bg-gray-900">

            <div className="relative isolate  z-10">
                <Image
                    src={carpoolBg}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="page-wrapper pt-8">

                    <div className="text-center min-h-12 lg:min-h-80 flex flex-col justify-between ">
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-5xl alk-sanet">
                            გაემგზავრე HOPPLA-ს დახმარებით სასურველ ადგილას
                        </h1>
                        <div className="-mt-28 translate-y-32 lg:translate-y-8">
                            <SearchBox type="carpool"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero