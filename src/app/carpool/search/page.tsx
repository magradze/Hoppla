import React, {Suspense} from 'react';
import SearchBox from "@/components/partial/SearchBox";
import {ISearchProps} from "@/interfaces/ISearchProps";
import {getRideByDate} from "@/lib/data/rides";
import RideCard from "@/components/rides/RidesCard";
import RidesNotFound from "@/components/rides/RidesNotFound";

const Search = async ({searchParams}: ISearchProps) => {

    const rides = await getRideByDate(searchParams.date);

    return (
        <div className="page-wrapper">
            <SearchBox className="" type="carpool"/>

            <Suspense fallback={<div>Loading...</div>}>
                {/*<SearchResults searchParams={searchParams}/>*/}
                <div className="relative z-10">
                    <div className="max-w-full">
                        <div className="py-10 sm:py-8">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                <div className="lg:col-span-2 flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        {/*<span>{searchParams.from} - {searchParams.to}</span>*/}
                                        {/*<span>{searchParams.date}</span>*/}
                                        {/*<span>{searchParams.seats} ადგილი</span>*/}
                                    </div>
                                    <div
                                        className="divide-y-0 divide-gray-50 text-sm leading-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {rides?.length ? rides.map((ride, index) => (
                                            // @ts-ignore
                                            <RideCard ride={ride} key={index}/>
                                        )) : <RidesNotFound/>}
                                    </div>
                                </div>
                                <div className="lg:col-span-1">
                                    ...
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
