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

export const RideAddMobileForm = ({
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
        <Drawer open={true} dismissible={false} modal={false}>
            <DrawerContent className="lg:hidden">
                <div className="lg:hidden mx-auto w-full max-w-sm">
                    <div className="p-8 pb-16">
                        <RideAddForm from={from} to={to}
                                     calculateDistance={calculateDistance} distance={distance} duration={duration}
                                     setPrice={setPrice} setSeats={setSeats} seats={seats}
                                     price={price} directionResponse={directionResponse}/>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

