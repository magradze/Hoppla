"use client"
import React, {useRef} from 'react';
import {Clock, Locate, MapPin, Route, X} from "lucide-react";
import {Autocomplete, GoogleMap} from '@react-google-maps/api';

const AddTripForm = ({map, origin, destination, calculateDistance, distance, duration}: {
                         map: any,
                         origin: any,
                         destination: any,
                         calculateDistance: any,
                         distance: any,
                         duration: any,
                     }
) => {

    const [disable, setDisable] = React.useState(true)

    const clearInputs = () => {
        origin.current.value = ""
        destination.current.value = ""
        setDisable(true)
    }

    return (
        <>
            <dl className="flex flex-col gap-4 relative">
                <div className="relative w-full h-16 rounded-md">

                    <button
                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 z-20 hover:text-blue-500"
                        onClick={() => {
                        }}
                    >
                        <Locate/>
                    </button>
                    <Autocomplete
                        onLoad={(autoComplete) => {
                            console.log(autoComplete)
                        }}
                        onPlaceChanged={() => {
                            if (!origin.current.value || !destination.current.value) return
                            destination.current.value && calculateDistance()
                        }}
                    >
                        <input
                            type="text"
                            name="from"
                            id="from"
                            className="block w-full h-16 rounded-md border border-gray-300 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                            placeholder={"საიდან"}
                            ref={origin}
                        />
                    </Autocomplete>
                </div>

                {/* rounded button for calculate distance from to going. this button must be between inputs. */}

                <button
                    className={`bg-red-500 w-16 h-16 rounded-md border-0 text-white absolute flex justify-center items-center top-10 right-4 z-10 ${disable ? "opacity-50 cursor-not-allowed invisible" : "hover:bg-red-600 visible"}`}
                    onClick={clearInputs}
                    disabled={disable}
                >
                    <X/>
                </button>


                <div className="relative w-full h-16 rounded-md">
                    <div
                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <MapPin/>
                    </div>
                    <Autocomplete
                        onLoad={(autoComplete) => {
                            console.log(autoComplete)
                        }}
                        onPlaceChanged={() => {
                            setDisable(false)
                            calculateDistance()
                        }}
                    >
                        <input
                            type="text"
                            name="goung"
                            id="going"
                            className="block w-full h-16 rounded-md border border-gray-300 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                            placeholder={"სად"}
                            ref={destination}
                        />
                    </Autocomplete>
                </div>


            </dl>

            <div className="mt-6 flex items-center gap-6 alk-sanet w-full text-gray-600 text-sm">
                <span className="flex items-center gap-2">
                    <Route/>
                    მანძილი: {!distance ? "0 კმ" : distance}
                </span>
                <span className="flex items-center gap-2">
                    <Clock/>
                    დრო: {!duration ? "0:00 სთ" : duration}
                </span>
            </div>
        </>
    );
};

export default AddTripForm;
