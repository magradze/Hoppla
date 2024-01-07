"use client"
import React, {useState} from 'react';
import AddTripSteps from "@/components/shared/trip/AddTripSteps";
import TripAllowedAction from "@/components/shared/trip/TripAllowedAction";
import AddStopPlaces from "@/components/shared/forms/AddStopPlaces";
import {Button} from "@/components/ui/button";
import {IRideConfirm} from "@/interfaces/IRideConfirm";
import {addRide} from "@/lib/data/rides";
import PriceInput from "@/components/rides/inputs/PriceInput";
import DirectionsInfo from "@/components/rides/DirectionsInfo";
import AdditionalInfo from "@/components/rides/AdditionalInfo";
import DateTimeInput from "@/components/rides/inputs/DateTimeInput";

const RideConfirmForm = ({user, searchParams}: IRideConfirm) => {

    const [stopPlaceField, setStopPlaceField] = useState([{name: ""}])
    const [disable, setDisable] = useState(true)


    const [dateToLeave, setDateToLeave] = useState(new Date().toISOString().split('T')[0])
    const [timeToLeave, setTimeToLeave] = useState(new Date().getHours() + ":" + new Date().getMinutes())
    const [newPrice, setNewPrice] = useState(parseFloat(searchParams.price as string))


    if (!searchParams.from || !searchParams.to || !searchParams.distance || !searchParams.duration || !searchParams.seats || !searchParams.price) return null

    const rideData = {
        name: `${searchParams.from} - ${searchParams.to}`,
        description: "",
        from: searchParams.from,
        to: searchParams.to,
        distance: parseFloat(String(searchParams.distance)),
        duration: parseInt(String(searchParams.duration)),
        seats: parseInt(String(searchParams.seats)),
        price: newPrice,
        startDate: dateToLeave,
        startTime: timeToLeave,
        driver: {
            id: user?.id
        },
        stops: stopPlaceField[0].name === "" ? [] : stopPlaceField,
    }

    return (
        <>
            <section aria-labelledby="summary-heading"
                     className="w-full lg:max-w-md flex-col lg:flex">

                <DirectionsInfo from={searchParams.from} to={searchParams.to} stopPlaceField={stopPlaceField}/>

                <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-200 p-6 rounded-b-md">
                    <AdditionalInfo distance={searchParams.distance} duration={searchParams.duration}
                                    seats={searchParams.seats}/>

                    <Button
                        variant="secondary"
                        size="lg"
                        className="mt-6 w-full"
                        disabled={disable}
                        onClick={() => {
                            addRide(rideData).then(r => r)
                        }}
                    >
                        მგზავრობის დამატება
                    </Button>
                </div>
            </section>

            <section
                className="flex flex-col"
            >
                <AddTripSteps/>
                <div className="max-w-full pt-6">

                    <PriceInput price={searchParams.price} setNewPrice={setNewPrice}/>


                    <DateTimeInput setDateToLeave={setDateToLeave} setTimeToLeave={setTimeToLeave}/>

                    <TripAllowedAction/>


                    <AddStopPlaces stopPlaceField={stopPlaceField} setStopPlaceField={setStopPlaceField}
                                   disabled={disable} setDisable={setDisable}/>

                </div>
            </section>
        </>
    );
};

export default RideConfirmForm;
