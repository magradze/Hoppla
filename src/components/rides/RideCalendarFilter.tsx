"use client";
import React from 'react';
import {Calendar} from "@/components/ui/calendar";

const RideCalendarFilter = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    console.log(date)

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-gray-100 bg-white"
        />
    );
};

export default RideCalendarFilter;
