import {Dispatch, RefObject, SetStateAction} from "react";

export interface IAddTripInput {
    inputRef: any,
    origin: RefObject<HTMLInputElement>,
    destination: RefObject<HTMLInputElement>,
    placeholder: string,
    name: string,
    setDisable: Dispatch<SetStateAction<boolean>>,
    setPassengers: Dispatch<SetStateAction<number>>,
    distance: number,
    duration: number,
    calculateDistance: () => void
}