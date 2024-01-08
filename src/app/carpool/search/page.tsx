import React, {Suspense} from 'react';
import SearchBox from "@/components/partial/SearchBox";
import {ISearchProps} from "@/interfaces/ISearchProps";
import {getRideByDate} from "@/lib/data/rides";
import RideCard from "@/components/rides/RidesCard";
import RidesNotFound from "@/components/rides/RidesNotFound";
import {Filter} from "lucide-react";

const Search = async ({searchParams}: ISearchProps) => {

    const rides = await getRideByDate(searchParams.date);

    return (
        <div className="page-wrapper mt-8">
            <SearchBox className="" type="carpool"/>

            <Suspense fallback={<div>Loading...</div>}>
                <div className="relative z-10">
                    <div className="max-w-full">
                        <div className="py-10 sm:py-8">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                <div className="lg:col-span-2 flex flex-col gap-2">
                                    <div
                                        className="flex flex-col gap-2 px-4 alk-sanet">

                                        <h3 className="font-bold text-xl text-secondary">{searchParams.from} - {searchParams.to}</h3>

                                        <div className="flex flex-row justify-between items-center">
                                            <span>{searchParams.date.split("T")[0]}</span>
                                            {/*<span>{searchParams.seats} ადგილი</span>*/}
                                            <Filter width={20} height={20} className="text-gray-400"/>
                                        </div>
                                    </div>
                                    <div
                                        className="divide-y-0 divide-gray-50 text-sm leading-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {rides?.length ? rides.map((ride, index) => (
                                            // @ts-ignore
                                            <RideCard key={index}
                                                      {...ride}
                                            />
                                        )) : <RidesNotFound/>}
                                    </div>
                                </div>
                                <div className="lg:col-span-1">
                                    <div className="flex flex-col gap-2 alk-sanet">
                                        <h2 className="font-bold text-xl text-secondary">მგზავრობა</h2>
                                        <p className="text-sm text-gray-500">ხელმისაწვდომია {rides?.length} ავტომობილი</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default Search;
