"use client"
import React from 'react';
import {X} from "lucide-react";
import {ITripFormClear} from "@/interfaces/ITripFormClear";

const TripFormClear = (
    {
        origin,
        destination,
        disable,
        setDisable,
        setPrice
    }: ITripFormClear
) => {

    const clearInputs = () => {
        origin.current.value = ""
        destination.current.value = ""
        setDisable(true)
        setPrice(0)
    }

    return (
        <button
            className={`bg-red-500 w-12 h-12 lg:w-16 lg:h-16 rounded-md border-0 text-white absolute flex justify-center items-center top-8 lg:top-10 right-4 z-10 ${disable ? "opacity-50 cursor-not-allowed invisible" : "hover:bg-red-600 visible"}`}
            onClick={clearInputs}
            disabled={disable}
        >
            <X/>
        </button>
    );
};

export default TripFormClear;
