"use client";
import {useState, useRef, useEffect, MutableRefObject} from 'react';
import AddTripForm from "@/components/shared/trip/AddTripForm";

import Map from "@/components/shared/trip/Map";

import {useJsApiLoader, Libraries} from '@react-google-maps/api';

const AddTrip = () => {
    const [directionResponse, setDirectionResponse] = useState<null>(null)
    const [distance, setDistance] = useState(0)
    const [duration, setDuration] = useState(0)

    const originRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const destinationRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const [totalPrice, setTotalPrice] = useState(0)
    const [price, setPrice] = useState(totalPrice)
    const [passengers, setPassengers] = useState(1)


    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    })

    useEffect(() => {
        setPrice(totalPrice / 4)
        switch (passengers) {
            case 1:
                setPrice(totalPrice)
                break;
            case 2:
                setPrice(totalPrice * 2)
                break;
            case 3:
                setPrice(totalPrice * 3)
                break;
            case 4:
                setPrice(totalPrice * 4)
                break;
        }
    }, [passengers, totalPrice])

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
        setDirectionResponse(result)
        // @ts-ignore
        setDistance(result.routes[0].legs[0].distance.value)
        // @ts-ignore
        setDuration(result.routes[0].legs[0].duration.value)

        // console.log("add duration", result.routes[0].legs[0]?.duration?.value)
        // console.log(Math.floor(result.routes[0].legs[0]?.duration?.value! / 3600 / 60))

        // setPrice(!duration && !distance ? 0 : (distance.split(" ")[0] * 0.3 * 2 / 4))
        // if (result.status !== "OK") return
        if (!result) return
        // @ts-ignore
        setTotalPrice(result.routes[0].legs[0].distance.text.split(" ")[0] * 0.3 * 2 / 4)
    }


    // @ts-ignore
    return (
        <div className="relative">

            <div className="page-wrapper">
            </div>
            <div className="page-wrapper grid grid-cols-1 gap-4 lg:grid-cols-2 py-0">
                <div className="flex flex-col justify-center bg-white p-4 lg:p-8 rounded-md">
                    <h2 className="text-sm lg:text-lg font-semibold text-gray-900 mb-6 alk-sanet">დაზოგეთ <span
                        className="text-primary font-semibold text-xl">{price.toFixed(2)}</span> ლარამდე
                        თქვენი
                        პირველი მგზავრობისას.</h2>
                    <AddTripForm origin={originRef} destination={destinationRef}
                                 calculateDistance={calculateDistance} distance={distance} duration={duration}
                                 setPrice={setPrice} setPassengers={setPassengers} passengers={passengers}
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