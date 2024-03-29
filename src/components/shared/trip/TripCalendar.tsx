"use client"
import React from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
// import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

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

const TripCalendar = () => {
    return (
        <>
            <div className="flex items-center text-gray-900 fira-go">
                <button
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">წინა თვე</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                </button>
                <div className="flex-auto text-sm font-semibold">იანვარი</div>
                <button
                    type="button"
                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">შემდეგი თვე</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                </button>
            </div>
            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500 fira-go">
                <div>ო</div>
                <div>ს</div>
                <div>ო</div>
                <div>ხ</div>
                <div>პ</div>
                <div>შ</div>
                <div>კ</div>
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
                                'mx-auto flex h-7 w-7 items-center justify-center rounded-md',
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
        </>
    );
};

export default TripCalendar;
