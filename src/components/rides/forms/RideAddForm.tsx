"use client"
import {useEffect, useState} from 'react';
import {Clock, Route} from "lucide-react";
import SeatSelector from "@/components/rides/buttons/SeatSelector";
import {IRideAddForm} from "@/interfaces/IRideAddForm";
import Link from "next/link";
import RideAddInput from "@/components/rides/inputs/RideAddInput";
import AddRideFormClear from "@/components/rides/buttons/AddRideFormClear";
import {convertSeconds} from "@/lib/tools/convertSeconds";

const RideAddForm = ({
                         from,
                         to,
                         calculateDistance,
                         distance,
                         duration,
                         setPrice,
                         setSeats,
                         seats,
                         price,
                         directionResponse
                     }: IRideAddForm
) => {

    const [disable, setDisable] = useState(true)
    const [tripQuery, setTripQuery] = useState({})


    useEffect(() => {
        if (directionResponse && from?.current?.value && to?.current?.value) {
            setTripQuery(
                {
                    from: from?.current?.value,
                    to: to?.current?.value,
                    distance: distance,
                    duration: duration,
                    price: price,
                    seats: seats
                }
            )
        }
    }, [to, directionResponse, distance, duration, from, seats, price])
    return (
        <>
            <dl className="flex flex-col gap-4 relative">

                <RideAddInput
                    inputRef={from}
                    from={from}
                    to={to}
                    placeholder="საიდან"
                    name="origin"
                    setDisable={setDisable}
                    calculateDistance={calculateDistance}
                    setSeats={setSeats}
                    distance={distance}
                    duration={duration}
                />


                <AddRideFormClear origin={from} destination={to} disable={disable} setDisable={setDisable}
                                  setPrice={setPrice} distance={distance} duration={duration} setSeats={setSeats}/>

                <RideAddInput
                    inputRef={to}
                    from={from}
                    to={to}
                    placeholder="სად"
                    name="destination"
                    setDisable={setDisable}
                    calculateDistance={calculateDistance}
                    setSeats={setSeats}
                    distance={distance}
                    duration={duration}
                />


                <div className=" w-full rounded-md flex flex-col lg:flex-row gap-4">
                    <SeatSelector setSeats={setSeats} seats={seats} disabled={disable}/>
                    {!disable && <Link
                        href={{
                            pathname: "/ride/add/confirm",
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

                    მანძილი: {!distance ? "0 კმ" : `${distance} კმ`}
                </span>
                <span className="flex items-center gap-2">
                    <Clock width={18} height={18}/>

                    დრო: {!duration ? "0:00" : convertSeconds(duration)} სთ
                </span>

            </div>
        </>
    );
};

export default RideAddForm;
