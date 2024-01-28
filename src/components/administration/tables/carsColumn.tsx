"use client"
import React from 'react';
import {AvatarGroup, useDisclosure} from "@nextui-org/react";
import {Avatar} from "@nextui-org/avatar";
import CarModal from "@/components/administration/modals/CarModal";

type CarColumnProps = {
    cars: any,
}

const CarColumn = ({cars}: CarColumnProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            {cars.map((car: any) => car).length > 0 ? (
                <AvatarGroup
                    max={6}
                    color={"primary"}
                    size="sm"
                    total={cars.map((car: any) => car).length > 0 ? cars.map((car: any) => car).length : 0}
                    renderCount={(count: number) => null}
                    className="self-end"
                >
                    {
                        cars.map((car: any, index: number) => (
                            <Avatar
                                key={index}
                                size="sm"
                                src={`/cars/${car.brand.toLowerCase()}.svg`}
                                onClick={onOpen}
                            />
                        ))
                    }
                </AvatarGroup>
            ) : <span className='text-xs self-end'>0</span>}
            <CarModal cars={cars} isOpen={isOpen} onOpenChange={onOpenChange}/>
        </>
    );
};

export default CarColumn;
