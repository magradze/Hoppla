export interface IRide {

    ride: {
        id: number;
        date: string;
        time: string;
        datetime: string;
        name: string;
        imageUrl: string;
        leavingFrom: string;
        goingTo: string;
        places: number;
        car: string;
        color: string;
        price: number;
        passengers: {
            name: string;
            imageUrl: string;
        }[]
    }
}