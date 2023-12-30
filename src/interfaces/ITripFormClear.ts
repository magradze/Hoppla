import React from "react";

export interface ITripFormClear {
    origin: React.MutableRefObject<HTMLInputElement>
    destination: React.MutableRefObject<HTMLInputElement>
    disable: boolean,
    setDisable: React.Dispatch<React.SetStateAction<boolean>>
    setPrice: React.Dispatch<React.SetStateAction<number>>
}