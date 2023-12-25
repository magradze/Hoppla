import React, {RefObject} from 'react';

export interface IAddTripForm {
    origin: RefObject<any>,
    destination: RefObject<any>,
    calculateDistance: any,
    distance: string,
    duration: string,
    setPrice: any,
    setPassengers: any,
    passengers: number
}