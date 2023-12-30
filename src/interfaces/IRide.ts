export interface IRide {

    ride: {
        id: number;
        startDate: string;
        time: string;
        datetime: string;
        name: string;
        driver: {
            name: string;
            email: string;
            image: string;
        };
        startLocation: string;
        endLocation: string;
        places: number;
        car: string;
        color: string;
        price: number;
        passengers: {
            name: string;
            imageUrl: string;
        }[],
        stops: [
            {
                name: string;
            }
        ]
    }
}