"use client"
import React, {useState} from 'react';
import {MapPin} from "lucide-react";
import Button from "@/components/shared/buttons/Button";
import AddTripSteps from "@/components/shared/trip/AddTripSteps";
import Image from "next/image";
import lariSymbol from "@/assets/lari.svg";
import moment from "moment/moment";
import TripAllowedAction from "@/components/shared/trip/TripAllowedAction";
import AddStopPlaces from "@/components/shared/forms/AddStopPlaces";
import {useSearchParams, useRouter} from "next/navigation";

const TripConfirmForm = ({user}: { user: any }) => {

    const route = useRouter()

    const [stopPlaceField, setStopPlaceField] = useState([{name: ""}])
    const [disable, setDisable] = useState(true)


    const searchParams = useSearchParams()

    const origin = searchParams.get('origin')
    const destination = searchParams.get('destination')
    const distance = searchParams.get('distance')
    const duration = searchParams.get('duration')
    const passengers = searchParams.get('passengers')
    const price = searchParams.get('price')


    const [timeToLeave, setTimeToLeave] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm'))
    const [newPrice, setNewPrice] = useState(parseFloat(price as string))


    if (!origin || !destination || !distance || !duration || !passengers || !price) return null

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
        name: `${origin} - ${destination}`,
        description: "",
        startLocation: origin,
        endLocation: destination,
        distance: parseInt(distance),
        duration,
        places: parseInt(passengers),
        price: newPrice,
        startDate: new Date(timeToLeave).toISOString(),
        driver: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
        },
        stops: stopPlaceField,
    }

    console.log(tripObject)

    const addTrip = async () => {
        const res = await fetch('/api/rides', {
            method: 'POST',
            body: JSON.stringify(tripObject),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data)
        route.push('/carpool')
    }

    return (
        <>
            <section aria-labelledby="summary-heading"
                     className="w-full lg:max-w-md flex-col lg:flex">

                <ul role="list" className="overflow-y-auto px-6 alk-sanet text-sm bg-gray-100 rounded-t-md">
                    <li className="flex space-x-6 py-6">
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <MapPin color={"#e84e3e"}/>
                            <h3 className="text-gray-900">{origin}</h3>

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
                                <h3 className="text-gray-900">{destination}</h3>
                            </div>
                        </div>
                    </li>
                </ul>

                <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-200 p-6 rounded-b-md">
                    <dl className=" space-y-6 text-sm font-medium text-gray-500 alk-sanet">
                        <div className="flex justify-between items-center">
                            <dt>მანძილი</dt>
                            <dd className="text-gray-900">{(+distance / 1000).toFixed(1) + " კმ"}</dd>
                        </div>
                        <div className="flex justify-between items-center">
                            <dt className="flex items-center">
                                დრო
                                <small
                                    className="hidden lg:block ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] tracking-wide text-gray-500">დანიშნულების
                                    ადგილამდე</small>
                            </dt>
                            <dd className="text-gray-900">{duration}</dd>
                        </div>
                        <div className="flex justify-between items-center">
                            <dt>მგზავრები</dt>
                            <dd className="text-gray-900">{passengers}</dd>
                        </div>
                    </dl>
                    <Button
                        className="mt-6 w-full bg-secondary hover:bg-secondaryDark text-white py-5"
                        disabled={disable}
                        onClick={addTrip}
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
                               className="block text-xs font-medium leading-6 mb-1 text-gray-900 alk-sanet">
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
                                defaultValue={price ? price : 0}
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

                    <div className="mb-6">
                        <label htmlFor="price"
                               className="block text-xs font-medium leading-6 mb-1 text-gray-900 alk-sanet">
                            გასვლის დრო
                        </label>
                        <div className="relative w-full h-12 lg:h-16 rounded-md">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <Image src={lariSymbol} alt={"Lari Symbol"} width={14} height={14}/>
                            </div>
                            <input
                                type="datetime-local"
                                name="timeToLeave"
                                id="timeToLeave"
                                className="block w-full h-12 lg:h-16 rounded-md focus:shadow-md outline-none py-1.5 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                                // value={moment(new Date()).format('YYYY-MM-DDTHH:mm') || timeToLeave}
                                onChange={(e) => setTimeToLeave(e.target.value)}
                            />
                        </div>
                        <p className="mt-1 ml-2 text-[9px] text-gray-400 alk-sanet" id="price-description">
                            თუ შემოთავაზებული მგზავრობის ღირებულება არ შეესაბამება თქვენს მოთხოვნებს, შეცვალეთ
                            სასურველი რაოდენობით.
                        </p>
                    </div>


                    <TripAllowedAction/>


                    <AddStopPlaces stopPlaceField={stopPlaceField} setStopPlaceField={setStopPlaceField}
                                   disabled={disable} setDisable={setDisable}/>

                </div>
            </section>
        </>
    );
};

export default TripConfirmForm;
