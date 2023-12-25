"use client";
import * as React from "react";
import {PageHeader, TripCalendar, TripCard} from "@/components/shared";
import carpoolBg from "@/assets/carpoolbg.svg";

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

const CarPool = () => {
    return (
        <div className="relative isolate  z-10">
            <PageHeader image={carpoolBg} text="მსუბუქი ავტომობილები"/>
            <div className="page-wrapper">
                <h2 className="text-base font-semibold leading-6 text-gray-900 alk-sanet">დღევანდელი მარშრუტები</h2>
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                    <div
                        className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                        <TripCalendar/>
                        <div>...</div>
                    </div>
                    <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                        {rides.map((ride) => (
                            <TripCard ride={ride} key={ride.id}/>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default CarPool;