"use client";
import React, {useState, useRef} from 'react';
import AddTripForm from "@/components/shared/AddTripForm";

import Map from "@/components/shared/Map";

import {useJsApiLoader, Libraries} from '@react-google-maps/api';

const AddTrip = () => {

    const [map, setMap] = useState(/** @type google.maps.Map */"")
    const [directionResponse, setDirectionResonse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef(null)
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef(null)

    const libraries: Libraries = ['places'];


    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries
    })

    if (!isLoaded) return null;

    const calculateDistance = async () => {
        if (!originRef.current || !destinationRef.current) return;

        const directionsService = new google.maps.DirectionsService();
        const result = await directionsService.route({
            // @ts-ignore
            origin: originRef.current.value,
            // @ts-ignore
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        })

        // @ts-ignore
        setDirectionResonse(result)
        // @ts-ignore
        setDistance(result.routes[0].legs[0].distance.text)
        // @ts-ignore
        setDuration(result.routes[0].legs[0].duration.text)
    }

    // @ts-ignore
    return (
        <div className="relative">

            <div className="page-wrapper">
            </div>
            <div className="page-wrapper grid grid-cols-1 gap-4 lg:grid-cols-2 py-0">
                <div className="flex flex-col justify-center bg-white p-8 rounded-md">
                    <h2 className="text-sm lg:text-lg font-semibold text-gray-900 mb-6 alk-sanet">დაზოგეთ 126 ლარამდე
                        თქვენი
                        პირველი მგზავრობისას.</h2>
                    <AddTripForm map={map} origin={originRef} destination={destinationRef}
                                 calculateDistance={calculateDistance} distance={distance} duration={duration}/>
                </div>
                <div className="flex flex-col justify-center">

                </div>
            </div>
            <div className="absolute h-screen inset-0  -translate-y-16 -z-10 w-full object-cover bg-blend-screen">
                <Map directionResponse={directionResponse} setMap={setMap} map={map}/>
            </div>
        </div>
    );
};

export default AddTrip;