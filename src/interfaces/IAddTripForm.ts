import React, {RefObject} from 'react';

export interface IAddTripForm {
    origin: RefObject<any>,
    destination: RefObject<any>,
    calculateDistance: () => void,
    distance: number,
    duration: string,
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    setPassengers: React.Dispatch<React.SetStateAction<number>>,
    passengers: number,
    price: number,
    directionResponse: any,
    google: any,
}