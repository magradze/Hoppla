"use client"
import {useEffect, useState} from 'react';
import {Clock, Route} from "lucide-react";
import PassangerSelector from "@/components/shared/PassangerSelector";
import {IAddTripForm} from "@/interfaces/IAddTripForm";
import Link from "next/link";
import AddTripInput from "@/components/shared/trip/AddTripInput";
import TripFormClear from "@/components/shared/buttons/TripFormClear";

const AddTripForm = ({
                         origin,
                         destination,
                         calculateDistance,
                         distance,
                         duration,
                         setPrice,
                         setPassengers,
                         passengers,
                         price,
                         directionResponse,
                         google
                     }: IAddTripForm
) => {

    const [disable, setDisable] = useState(true)
    const [tripQuery, setTripQuery] = useState({})


    useEffect(() => {
        if (directionResponse && directionResponse?.status === "OK") {
            setTripQuery(
                {
                    origin: origin?.current?.value,
                    destination: destination?.current?.value,
                    distance: distance,
                    duration: duration,
                    passengers: passengers,
                    price: price,
                    google: google
                }
            )
        }
    }, [destination, directionResponse, distance, duration, origin, passengers, price])

    // @ts-ignore
    return (
        <>
            <dl className="flex flex-col gap-4 relative">

                <AddTripInput
                    inputRef={origin}
                    origin={origin}
                    destination={destination}
                    placeholder="საიდან"
                    name="origin"
                    setDisable={setDisable}
                    calculateDistance={calculateDistance}
                    setPassengers={setPassengers}
                    distance={distance}
                    duration={duration}
                />


                <TripFormClear origin={origin} destination={destination} disable={disable} setDisable={setDisable}
                               setPrice={setPrice}/>

                <AddTripInput
                    inputRef={destination}
                    origin={origin}
                    destination={destination}
                    placeholder="სად"
                    name="destination"
                    setDisable={setDisable}
                    calculateDistance={calculateDistance}
                    setPassengers={setPassengers}
                    distance={distance}
                    duration={duration}
                />


                <div className=" w-full rounded-md flex flex-col lg:flex-row gap-4">
                    <PassangerSelector setPassengers={setPassengers} passengers={passengers} disabled={disable}/>
                    {!disable && <Link
                        href={{
                            pathname: "/trip/add/confirm",
                            query: tripQuery
                        }}
                        className={`bg-secondary hover:bg-secondaryDark h-12 lg:h-16 rounded-md border-0 px-24 py-0.5 text-white alk-sanet flex justify-center items-center`}
                        aria-disabled={disable}
                    >
                        შემდეგი
                    </Link>}
                </div>


            </dl>

            <div className="mt-6 flex items-center gap-6 alk-sanet w-full text-gray-600 text-xs lg:text-base">
                <span className="flex items-center gap-2">
                    <Route width={18} height={18}/>

                    მანძილი: {!distance ? "0 კმ" : `${(distance / 1000).toFixed(1)} კმ`}
                </span>
                <span className="flex items-center gap-2">
                    <Clock width={18} height={18}/>

                    დრო: {!duration
                    ? "0 სთ 0 წთ"
                    : duration < 3600 ? `${Math.floor(duration / 60)} წთ` : `${Math.floor(duration / 3600)} სთ ${Math.floor(duration / 60 % 60)} წთ`
                }
                </span>

            </div>
        </>
    );
};

export default AddTripForm;
