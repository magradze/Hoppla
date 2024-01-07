"use client";
import {useState, useRef, useEffect, MutableRefObject} from 'react';
import RideAddForm from "@/components/rides/forms/RideAddForm";

import Map from "@/components/shared/trip/Map";

import {useJsApiLoader} from '@react-google-maps/api';
import {meterToKm} from "@/lib/tools/meterToKm";
import {calculatePrice} from "@/lib/tools/calculatePrice";

const AddTrip = () => {
    const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult>(
        {
            geocoded_waypoints: [],
            routes: [],
        }
    )
    const [distance, setDistance] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    const originRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const destinationRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [price, setPrice] = useState<number>(totalPrice)
    const [seats, setSeats] = useState<number>(1)

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    })

    useEffect(() => {
        if (seats === 1) {
            setPrice(totalPrice / 4)
        } else {
            setPrice(totalPrice / 4 * seats)
        }

    }, [seats, totalPrice])

    if (!isLoaded) return null;

    const calculateDistance = async () => {
        if (!originRef.current || !destinationRef.current) return;

        const directionsService = new google.maps.DirectionsService();
        const result = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        })
        if (!result) return

        setDirectionResponse(result)
        const distance = meterToKm(result.routes[0].legs[0].distance?.value as number)

        setDistance(distance)
        setDuration(result.routes[0].legs[0].duration?.value as number)

        const price = calculatePrice(distance)

        setTotalPrice(price)
    }

    return (
        <div className="relative">

            <div className="page-wrapper  p-4 lg:p-8">
            </div>
            <div className="page-wrapper grid grid-cols-1 gap-4 lg:grid-cols-2 py-0">
                <div className="flex flex-col justify-center bg-white p-4 lg:p-8 rounded-md">
                    <h2 className="text-sm lg:text-lg font-semibold text-gray-900 mb-6 alk-sanet">დაზოგეთ <span
                        className="text-primary font-semibold text-xl">{price.toFixed(2)}</span> ლარამდე
                        თქვენი
                        პირველი მგზავრობისას.</h2>
                    <RideAddForm from={originRef} to={destinationRef}
                                 calculateDistance={calculateDistance} distance={distance} duration={duration}
                                 setPrice={setPrice} setSeats={setSeats} seats={seats}
                                 price={price} directionResponse={directionResponse} google={google}/>
                </div>
                <div className="flex flex-col justify-center">

                </div>
            </div>
            <div className="absolute h-screen inset-0  -translate-y-16 -z-10 w-full object-cover bg-blend-screen">
                <Map directionResponse={directionResponse}/>
            </div>
        </div>
    );
};

export default AddTrip;