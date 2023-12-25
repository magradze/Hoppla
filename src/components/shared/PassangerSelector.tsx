"use client"
import React from 'react';
import {UsersRound} from "lucide-react";

const PassangerSelector = ({setPassengers, passengers, disabled}: {
    setPassengers: any,
    passengers: any,
    disabled: boolean
}) => {

    const increment = () => {
        setPassengers(passengers + 1)
    }

    const decrement = () => {
        setPassengers(passengers - 1)
    }

    return (
        <div className="relative w-full h-12 lg:h16 rounded-md flex items-center">

            <div className="relative flex items-center max-w-[11rem]">
                <button type="button" id="decrement-button" data-input-counter-decrement="bedrooms-input"
                        className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:outline-none disabled:opacity-50"
                        onClick={decrement} disabled={
                    passengers === 1
                }>
                    <svg className="w-3 h-3 text-secondary" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 1h16"/>
                    </svg>
                </button>
                <input type="text" id="bedrooms-input" data-input-counter-min="1" data-input-counter-max="5"
                       aria-describedby="helper-text-explanation"
                       className="bg-gray-100 border-x-0 border-y border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 rounded-none"
                       placeholder="" value={passengers} required disabled/>
                <div
                    className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
                    <UsersRound width={12} height={12}/>
                    <span className="alk-sanet">მგზავრი</span>
                </div>
                <button type="button" id="increment-button" data-input-counter-increment="bedrooms-input"
                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:outline-none disabled:opacity-50"
                        onClick={increment}
                        disabled={
                            passengers === 4 || disabled
                        }
                >
                    <svg className="w-3 h-3 text-secondary" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>

        </div>
    );
};

export default PassangerSelector;
