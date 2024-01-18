"use client"
import React from 'react';
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Bus, BusFront, Car} from "lucide-react";

const CarTypesTab = () => {
    return (
        <div className="w-full flex justify-center mb-4">
            <Tabs defaultValue="carpool" className="w-full fira-go">
                <TabsList className="w-full">
                    <TabsTrigger type="button" defaultValue="test" value="all" className="flex flex-col">
                        ყველა
                        <small className="text-base">3</small>
                    </TabsTrigger>
                    <TabsTrigger value="carpool" className="flex flex-col">
                        მსუბუქი ავტომობილები
                        <small className="flex flex-row justify-center items-center gap-2 text-base">
                            <Car width={18}/>
                            3
                        </small>
                    </TabsTrigger>
                    <TabsTrigger value="minibus" className="flex flex-col">
                        მინიბუსი
                        <small className="flex flex-row justify-center items-center gap-2 text-base">
                            <Bus width={18}/>
                            0
                        </small>
                    </TabsTrigger>
                    <TabsTrigger value="bus" className="flex flex-col">
                        ავტობუსი
                        <small className="flex flex-row justify-center items-center gap-2 text-base">
                            <BusFront width={18}/>
                            0
                        </small>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
};

export default CarTypesTab;
