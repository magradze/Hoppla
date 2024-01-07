import * as React from "react"
import {MinusIcon, PlusIcon} from "@radix-ui/react-icons"

import {Button} from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {IRideAddForm} from "@/interfaces/IRideAddForm";
import RideAddForm from "@/components/rides/forms/RideAddForm";

export const RideAddDesktopForm = ({
                                       from,
                                       to,
                                       calculateDistance,
                                       distance,
                                       duration,
                                       setPrice,
                                       setSeats,
                                       seats,
                                       price,
                                       directionResponse
                                   }: IRideAddForm) => {

    return (

        <RideAddForm from={from} to={to}
                     calculateDistance={calculateDistance} distance={distance} duration={duration}
                     setPrice={setPrice} setSeats={setSeats} seats={seats}
                     price={price} directionResponse={directionResponse}/>

    )
}

