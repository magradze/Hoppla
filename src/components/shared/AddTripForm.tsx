"use client"
import {useState} from 'react';
import {Clock, Locate, MapPin, Route, X} from "lucide-react";
import {Autocomplete} from '@react-google-maps/api';
import PassangerSelector from "@/components/shared/PassangerSelector";
import {IAddTripForm} from "@/interfaces/IAddTripForm";

const AddTripForm = ({
                         origin,
                         destination,
                         calculateDistance,
                         distance,
                         duration,
                         setPrice,
                         setPassengers,
                         passengers
                     }: IAddTripForm
) => {

    const [disable, setDisable] = useState(true)

    const clearInputs = () => {
        origin.current.value = ""
        destination.current.value = ""
        setDisable(true)
        setPrice(0)
    }

    const currentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            origin.current.value = pos.lat + ", " + pos.lng

        });

    }

    const handleChange = (event: any) => {
        if (event.target.value === "") {
            setDisable(true)
            // setPrice(0)
            setPassengers(1)
            distance = "0"
            duration = "0"
        }
    };

    return (
        <>
            <dl className="flex flex-col gap-4 relative">
                <div className="relative w-full h-12 lg:h-16 rounded-md">

                    <button
                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 z-20 hover:text-blue-500"
                        onClick={() => currentLocation()}
                    >
                        <Locate/>
                    </button>

                    <Autocomplete
                        onLoad={(autoComplete) => {
                            // console.log(autoComplete)
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
                            className="block w-full h-12 lg:h-16 rounded-md border border-gray-300 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                            placeholder={"საიდან"}
                            ref={origin}
                        />
                    </Autocomplete>
                </div>


                <button
                    className={`bg-red-500 w-12 h-12 lg:w-16 lg:h-16 rounded-md border-0 text-white absolute flex justify-center items-center top-8 lg:top-10 right-4 z-10 ${disable ? "opacity-50 cursor-not-allowed invisible" : "hover:bg-red-600 visible"}`}
                    onClick={clearInputs}
                    disabled={disable}
                >
                    <X/>
                </button>


                <div className="relative w-full h-12 lg:h-16 rounded-md">
                    <div
                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <MapPin/>
                    </div>
                    <Autocomplete
                        onLoad={(autoComplete) => {
                            // console.log(autoComplete)
                        }}
                        onPlaceChanged={() => {
                            setDisable(false)
                            calculateDistance()
                        }}
                        onUnmount={() => {
                            setDisable(true)
                        }}
                    >
                        <input
                            type="text"
                            name="goung"
                            id="going"
                            className="block w-full h-12 lg:h-16 rounded-md border border-gray-300 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                            placeholder={"სად"}
                            ref={destination}
                            onChange={handleChange}
                        />
                    </Autocomplete>
                </div>

                <div className=" w-full rounded-md flex flex-col lg:flex-row gap-4">
                    <PassangerSelector setPassengers={setPassengers} passengers={passengers} disabled={disable}/>
                    <button
                        className="bg-secondary hover:bg-secondaryDark block h-12 lg:h-16 rounded-md border-0 px-24 py-0.5 text-white alk-sanet disabled:opacity-50"
                        disabled={disable}
                    >
                        შემდეგი
                    </button>
                </div>


            </dl>

            <div className="mt-6 flex items-center gap-6 alk-sanet w-full text-gray-600 text-xs lg:text-base">
                <span className="flex items-center gap-2">
                    <Route width={18} height={18}/>
                    მანძილი: {!distance ? "0 კმ" : distance.split(" ")[0] + " კმ"}
                </span>
                <span className="flex items-center gap-2">
                    <Clock width={18} height={18}/>

                    დრო: {!duration
                    ? "0 სთ 0 წთ"
                    : duration.split(" ")[2]
                        ? duration.split(" ")[0] + " სთ" + " " + duration.split(" ")[2] + " წთ"
                        : duration.split(" ")[0] + " წთ"
                }
                </span>

            </div>
        </>
    );
};

export default AddTripForm;
