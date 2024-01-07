import React from 'react';
import {X} from "lucide-react";
import {IRideFormClear} from "@/interfaces/IRideFormClear";
import {Button} from "@/components/ui/button";

const AddRideFormClear = (
    {
        origin,
        destination,
        disable,
        setDisable,
        setPrice,
        setSeats
    }: IRideFormClear
) => {

    const clearInputs = () => {
        origin.current.value = ""
        destination.current.value = ""
        setDisable(true)
        setPrice(0)
        setSeats(1)
    }

    return (
        <Button
            variant="rideAddFormClear"
            className={` ${disable ? "opacity-50 cursor-not-allowed invisible" : "hover:bg-red-600 visible"}`}
            onClick={clearInputs}
            disabled={disable}
        >
            <X/>
        </Button>
    );
};

export default AddRideFormClear;
