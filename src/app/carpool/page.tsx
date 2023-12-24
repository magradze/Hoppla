"use client";
import {Fragment} from 'react'
import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    MapPinIcon,
} from '@heroicons/react/20/solid'
import {Menu, Transition} from '@headlessui/react'
import * as React from "react";
import Image from "next/image";

const rides = [
    {
        id: 1,
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        leavingFrom: 'თბილისი',
        goingTo: 'ხაშური',
        places: 4,
        car: 'BMW X5',
        color: 'red',
        price: 20,
        passengers: [
            {
                name: 'Michael Foster',
                imageUrl:
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
                name: 'Dries Vincent',
                imageUrl:
                    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
                name: 'Lindsay Walton',
                imageUrl:
                    'https://images.unsplash.com/photo-1549213783-8284d0336cbb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
                name: 'Courtney Henry',
                imageUrl:
                    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
        ]
    },
    {
        id: 2,
        date: 'January 9th, 2022',
        time: '12:00 PM',
        datetime: '2022-01-09T12:00',
        name: 'Michael Foster',
        imageUrl:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        leavingFrom: 'რუსთავი',
        goingTo: 'ბორჯომი',
        places: 4,
        car: 'BMW X5',
        color: 'red',
        price: 20,
        passengers: [
            {
                name: 'Dries Vincent',
                imageUrl:
                    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
                name: 'Lindsay Walton',
                imageUrl:
                    'https://images.unsplash.com/photo-1549213783-8284d0336cbb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
                name: 'Courtney Henry',
                imageUrl:
                    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
        ]
    },
    {
        id: 3,
        date: 'January 9th, 2022',
        time: '12:00 PM',
        datetime: '2022-01-09T12:00',
        name: 'Dries Vincent',
        imageUrl:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        leavingFrom: 'ქუთაისი',
        goingTo: 'საგარეჯო',
        places: 4,
        car: 'BMW X5',
        color: 'red',
        price: 20,
        passengers: [
            {
                name: 'Lindsay Walton',
                imageUrl:
                    'https://images.unsplash.com/photo-1549213783-8284d0336cbb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            },
            {
                name: 'Courtney Henry',
                imageUrl:
                    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
        ],
    },
    // More meetings...
]
const days = [
    {date: '2021-12-27'},
    {date: '2021-12-28'},
    {date: '2021-12-29'},
    {date: '2021-12-30'},
    {date: '2021-12-31'},
    {date: '2022-01-01', isCurrentMonth: true},
    {date: '2022-01-02', isCurrentMonth: true},
    {date: '2022-01-03', isCurrentMonth: true},
    {date: '2022-01-04', isCurrentMonth: true},
    {date: '2022-01-05', isCurrentMonth: true},
    {date: '2022-01-06', isCurrentMonth: true},
    {date: '2022-01-07', isCurrentMonth: true},
    {date: '2022-01-08', isCurrentMonth: true},
    {date: '2022-01-09', isCurrentMonth: true},
    {date: '2022-01-10', isCurrentMonth: true},
    {date: '2022-01-11', isCurrentMonth: true},
    {date: '2022-01-12', isCurrentMonth: true, isToday: true},
    {date: '2022-01-13', isCurrentMonth: true},
    {date: '2022-01-14', isCurrentMonth: true},
    {date: '2022-01-15', isCurrentMonth: true},
    {date: '2022-01-16', isCurrentMonth: true},
    {date: '2022-01-17', isCurrentMonth: true},
    {date: '2022-01-18', isCurrentMonth: true},
    {date: '2022-01-19', isCurrentMonth: true},
    {date: '2022-01-20', isCurrentMonth: true},
    {date: '2022-01-21', isCurrentMonth: true},
    {date: '2022-01-22', isCurrentMonth: true, isSelected: true},
    {date: '2022-01-23', isCurrentMonth: true},
    {date: '2022-01-24', isCurrentMonth: true},
    {date: '2022-01-25', isCurrentMonth: true},
    {date: '2022-01-26', isCurrentMonth: true},
    {date: '2022-01-27', isCurrentMonth: true},
    {date: '2022-01-28', isCurrentMonth: true},
    {date: '2022-01-29', isCurrentMonth: true},
    {date: '2022-01-30', isCurrentMonth: true},
    {date: '2022-01-31', isCurrentMonth: true},
    {date: '2022-02-01'},
    {date: '2022-02-02'},
    {date: '2022-02-03'},
    {date: '2022-02-04'},
    {date: '2022-02-05'},
    {date: '2022-02-06'},
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const CarPool = () => {
    // @ts-ignore
    return (
        <div className="max-w-7xl mx-auto py-8 px-8">
            <h2 className="text-base font-semibold leading-6 text-gray-900 alk-sanet">დღევანდელი მარშრუტები</h2>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                    <div className="flex items-center text-gray-900">
                        <button
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                        <div className="flex-auto text-sm font-semibold">January</div>
                        <button
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                        <div>S</div>
                    </div>
                    <div
                        className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                        {days.map((day, dayIdx) => (
                            <button
                                key={day.date}
                                type="button"
                                className={classNames(
                                    'py-1.5 hover:bg-gray-100 focus:z-10',
                                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                                    // @ts-ignore
                                    (day.isSelected || day.isToday) && 'font-semibold',
                                    day.isSelected && 'text-white',
                                    !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                                    !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                                    day.isToday && !day.isSelected && 'text-indigo-600',
                                    dayIdx === 0 && 'rounded-tl-lg',
                                    dayIdx === 6 && 'rounded-tr-lg',
                                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                                    dayIdx === days.length - 1 && 'rounded-br-lg'
                                )}
                            >
                                <time
                                    dateTime={day.date}
                                    className={classNames(
                                        'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                        // @ts-ignore
                                        day.isSelected && day.isToday && 'bg-indigo-600',
                                        day.isSelected && !day.isToday && 'bg-gray-900'
                                    )}
                                >
                                    {
                                        // @ts-ignore
                                        day.date.split('-').pop().replace(/^0/, '')}
                                </time>
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add event
                    </button>
                </div>
                <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                    {rides.map((ride) => (
                        <li key={ride.id} className="relative flex space-x-6 py-6 xl:static">
                            <Image src={ride.imageUrl} alt="" className="h-14 w-14 flex-none rounded-full" width={42}
                                   height={42}/>
                            <div className="flex-auto">
                                <div className="flex flex-col md:flex-row md:justify-between relative">
                                    <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0 relative">
                                        {ride.name}
                                        <small className="ml-4 relative rounded-sm px-2 py-0.5 text-white"
                                               style={{backgroundColor: ride.color}}>
                                            {ride.car}
                                        </small>

                                    </h3>
                                    <div className="flex gap-2 ml-0">
                                        <span
                                            className="text-xs font-medium text-white py-1 px-2 rounded-sm alk-sanet bg-secondary">
                                            {ride.price}₾
                                        </span>
                                        <span
                                            className="text-xs font-medium text-white py-1 px-2 rounded-sm bg-indigo-600 alk-sanet">
                                            {ride.places} ადგილი
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
                                            <time dateTime={ride.datetime}>
                                                {ride.time}
                                            </time>
                                        </dd>
                                    </div>
                                    <div
                                        className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Location</span>
                                            <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        </dt>
                                        <dd>{ride.leavingFrom}</dd>
                                    </div>
                                    <div
                                        className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Location</span>
                                            <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        </dt>
                                        <dd>{ride.goingTo}</dd>
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
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default CarPool;
