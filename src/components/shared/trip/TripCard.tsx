import React, {Fragment} from 'react';
import Image from "next/image";
import {CalendarIcon, EllipsisHorizontalIcon, MapPinIcon} from "@heroicons/react/20/solid";
import {Menu, Transition} from "@headlessui/react";
import {IRide} from "@/interfaces/IRide";
import {classNames} from "@/lib/className";
import {CircleDot} from "lucide-react";
import Tooltip from "@/components/shared/Tooltip";

const TripCard = ({ride: ride}: IRide) => {

    const {
        name,
        driver,
        startDate,
        startLocation,
        endLocation,
        duration,
        car,
        color,
        price,
        passengers,
        places,
        stops
    } = ride

    return (
        <>
            <li className="relative flex space-x-6 py-6 px-8 xl:static bg-white hover:shadow-xl cursor-pointer rounded-md transition duration-500 group-hover:scale-105">
                <Image src={driver.image} alt={driver.name} className="h-14 w-14 flex-none rounded-md" width={42}
                       height={42}/>
                <div className="flex-auto">
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="pr-10 font-semibold text-gray-900 xl:pr-0 alk-sanet">

                            <ul role="list" className="space-x-6">

                                <li className="relative flex flex-row gap-6">
                                    <div
                                        className="relative flex gap-2">

                                        <div
                                            className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                            <CircleDot className="h-6 w-6 text-primary" aria-hidden="true"/>

                                            {/*<div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"/>*/}
                                        </div>
                                        <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                                            <span className="font-medium text-gray-900">{startLocation}</span>
                                        </p>
                                    </div>

                                    {stops.map((stop, index) => (
                                        <div
                                            key={index}
                                            className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">

                                            <Tooltip message={stop.name}>
                                                <div
                                                    className="h-1.5 w-1.5 rounded-full bg-gray-300 ring-1 ring-gray-300"/>
                                            </Tooltip>
                                        </div>
                                    ))}

                                    <div
                                        className="relative flex flex-row-reverse gap-2">

                                        <div
                                            className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                            <CircleDot className="h-6 w-6 text-primary" aria-hidden="true"/>

                                            {/*<div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"/>*/}
                                        </div>
                                        <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                                            <span className="font-medium text-gray-900">{endLocation}</span>
                                        </p>
                                    </div>

                                </li>
                            </ul>


                        </div>
                        <div className="flex gap-2 ml-0">
                            <span
                                className="text-xs font-medium text-white py-1 px-2 rounded-sm alk-sanet bg-secondary">
                                {price}₾
                            </span>
                            <span
                                className="text-xs font-medium text-white py-1 px-2 rounded-sm bg-indigo-600 alk-sanet">
                                {places} ადგილი
                            </span>
                        </div>
                    </div>
                    <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                        <div className="flex items-start space-x-3">
                            <dt className="mt-0.5">
                                <span className="sr-only">Date</span>
                                <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </dt>
                            <dd>
                                <time dateTime={startDate}>
                                    {new Date(startDate).toLocaleDateString('ka', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric'
                                    })}
                                </time>
                            </dd>
                        </div>
                        <div
                            className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5 alk-sanet text-[12px]">
                            <dt className="mt-0.5">
                                <span className="sr-only">Location</span>
                                <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </dt>
                            <dd>{startLocation}</dd>
                        </div>
                        <div
                            className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5 alk-sanet text-[12px]">
                            <dt className="mt-0.5">
                                <span className="sr-only">Location</span>
                                <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </dt>
                            <dd>{endLocation}</dd>
                        </div>
                    </dl>
                </div>
                <Menu as="div"
                      className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
                    <div>
                        <Menu.Button
                            className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                            <span className="sr-only">Open options</span>
                            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true"/>
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({active}) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Edit
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Cancel
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </li>
        </>
    );
};

export default TripCard;
