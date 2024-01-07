"use client"
import React, {useState} from 'react';
import {MapPin} from "lucide-react";
import AddTripSteps from "@/components/shared/trip/AddTripSteps";
import Image from "next/image";
import lariSymbol from "@/assets/lari.svg";
import TripAllowedAction from "@/components/shared/trip/TripAllowedAction";
import AddStopPlaces from "@/components/shared/forms/AddStopPlaces";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {convertSeconds} from "@/lib/tools/convertSeconds";
import {IRideConfirm} from "@/interfaces/IRideConfirm";
import {iRideAdd} from "@/interfaces/IRideAdd";

const RideConfirmForm = ({user, searchParams}: IRideConfirm) => {

    const route = useRouter()

    const [stopPlaceField, setStopPlaceField] = useState([{name: ""}])
    const [disable, setDisable] = useState(true)


    const [dateToLeave, setDateToLeave] = useState(new Date().toISOString().split('T')[0])
    const [timeToLeave, setTimeToLeave] = useState(new Date().getHours() + ":" + new Date().getMinutes())
    const [newPrice, setNewPrice] = useState(parseFloat(searchParams.price as string))


    if (!searchParams.from || !searchParams.to || !searchParams.distance || !searchParams.duration || !searchParams.seats || !searchParams.price) return null

    // const directionsServ = async () => {
    //     const directionsService = new google.maps.DirectionsService();
    //     const result = await directionsService.route({
    //         origin,
    //         destination,
    //         travelMode: google.maps.TravelMode.DRIVING
    //     })
    //     console.log(result)
    // }


    const tripObject = {
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
            id: user.id
        },
        stops: stopPlaceField[0].name === "" ? [] : stopPlaceField,
    }


    const addRide = async () => {
        const res = await fetch('/api/rides', {
            method: 'POST',
            body: JSON.stringify(tripObject),
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        })

        const data = await res.json()
        console.log(data)
        // route.push('/carpool')
    }

    return (
        <>
            <section aria-labelledby="summary-heading"
                     className="w-full lg:max-w-md flex-col lg:flex">

                <ul role="list" className="overflow-y-auto px-6 alk-sanet text-sm bg-gray-100 rounded-t-md">
                    <li className="flex space-x-6 py-6">
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <MapPin color={"#e84e3e"}/>
                            <h3 className="text-gray-900">{searchParams.from}</h3>

                        </div>
                    </li>

                    <div
                        className="ml-2 pl-8 border-l-2 -my-4 border-dashed">
                        {stopPlaceField.map((field, index: number) => (
                            <li key={index} className="py-4">
                                <h3 className="text-gray-500 text-xs">{field.name}</h3>
                            </li>
                        ))}
                    </div>

                    <li className="flex space-x-6 py-6">
                        <div className="flex flex-col justify-between space-y-4">
                            <div className="flex flex-row gap-4 justify-center items-center">
                                <MapPin color={"#e84e3e"}/>
                                <h3 className="text-gray-900">{searchParams.to}</h3>
                            </div>
                        </div>
                    </li>
                </ul>

                <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-200 p-6 rounded-b-md">
                    <dl className=" space-y-6 text-sm font-medium text-gray-500 alk-sanet">
                        <div className="flex justify-between items-center">
                            <dt>მანძილი</dt>
                            <dd className="text-gray-900">{searchParams.distance + " კმ"}</dd>
                        </div>
                        <div className="flex justify-between items-center">
                            <dt className="flex items-center">
                                დრო
                                <small
                                    className="hidden lg:block ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] tracking-wide text-gray-500">დანიშნულების
                                    ადგილამდე</small>
                            </dt>
                            <dd className="text-gray-900">{convertSeconds(searchParams.duration)}</dd>
                        </div>
                        <div className="flex justify-between items-center">
                            <dt>მგზავრები</dt>
                            <dd className="text-gray-900">{searchParams.seats}</dd>
                        </div>
                    </dl>
                    <Button
                        variant="secondary"
                        className="mt-6 w-full"
                        disabled={disable}
                        onClick={addRide}
                    >
                        მგზავრობის დამატება
                    </Button>

                    {/*<Button*/}
                    {/*    className="mt-6 w-full bg-secondary hover:bg-secondaryDark text-white"*/}
                    {/*    onClick={directionsServ}*/}
                    {/*>*/}
                    {/*    Directions*/}
                    {/*</Button>*/}
                </div>
            </section>

            <section
                className="flex flex-col"
            >
                <AddTripSteps/>
                <div className="max-w-full pt-6">

                    <div className="mb-6">
                        <label htmlFor="price"
                               className="mb-3 block text-sm font-medium text-gray-900 alk-sanet">
                            მგზავრობის ღირებულება
                        </label>
                        <div className="relative w-full h-12 lg:h-16 rounded-md">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <Image src={lariSymbol} alt={"Lari Symbol"} width={14} height={14}/>
                            </div>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                className="block w-full h-12 lg:h-16 rounded-md focus:shadow-md outline-none py-1.5 px-14 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                                placeholder={"ფასი"}
                                defaultValue={searchParams.price ? parseFloat(searchParams.price).toFixed(2) : 0}
                                onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span className="text-gray-500 sm:text-sm alk-sanet" id="price-currency">
                                    ლარი
                                  </span>
                            </div>
                        </div>
                        <p className="mt-1 ml-2 text-[9px] text-gray-400 alk-sanet" id="price-description">
                            თუ შემოთავაზებული მგზავრობის ღირებულება არ შეესაბამება თქვენს მოთხოვნებს, შეცვალეთ
                            სასურველი რაოდენობით.
                        </p>
                    </div>


                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5 alk-sanet">
                                <label htmlFor="dateToLeave" className="mb-3 block text-sm font-medium text-gray-900">
                                    გასვლის დღე
                                </label>
                                <input type="date" name="dateToLeave" id="dateToLeave"
                                       className="block w-full h-12 lg:h-16 rounded-md focus:shadow-md outline-none py-1.5 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                       onChange={(e) => {
                                           setDateToLeave(e.target.value);
                                       }}
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5 alk-sanet">
                                <label htmlFor="time" className="mb-3 block text-sm font-medium text-gray-900">
                                    გასვლის დრო
                                </label>
                                <input type="time" name="time" id="time"
                                       className="block w-full h-12 lg:h-16 rounded-md focus:shadow-md outline-none py-1.5 px-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                       onChange={(e) => setTimeToLeave(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/*<label htmlFor="price"*/}
                    {/*       className="block text-xs font-medium leading-6 mb-1 text-gray-900 alk-sanet">*/}
                    {/*    გასვლის დრო*/}
                    {/*</label>*/}
                    {/*<div className="relative w-full h-12 lg:h-16 rounded-md">*/}
                    {/*    <div*/}
                    {/*        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">*/}
                    {/*        <Image src={lariSymbol} alt={"Lari Symbol"} width={14} height={14}/>*/}
                    {/*    </div>*/}
                    {/*    <input*/}
                    {/*        type="date"*/}
                    {/*        name="dateToLeave"*/}
                    {/*        id="dateToLeave"*/}
                    {/*        className="block w-full h-12 lg:h-16 rounded-md focus:shadow-md outline-none py-1.5 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 "*/}
                    {/*        // value={moment(new Date()).format('YYYY-MM-DDTHH:mm') || dateToLeave}*/}
                    {/*        onChange={(e) => setdateToLeave(e.target.value)}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<p className="mt-1 ml-2 text-[9px] text-gray-400 alk-sanet" id="price-description">*/}
                    {/*    თუ შემოთავაზებული მგზავრობის ღირებულება არ შეესაბამება თქვენს მოთხოვნებს, შეცვალეთ*/}
                    {/*    სასურველი რაოდენობით.*/}
                    {/*</p>*/}

                    <TripAllowedAction/>


                    <AddStopPlaces stopPlaceField={stopPlaceField} setStopPlaceField={setStopPlaceField}
                                   disabled={disable} setDisable={setDisable}/>

                </div>
            </section>
        </>
    );
};

export default RideConfirmForm;
