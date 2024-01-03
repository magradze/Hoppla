export interface IRide {

    ride: {
        id: string;
        startDate: Date | string;
        // time: string;
        // datetime: string;
        name: string;
        driver: {
            name: string | null;
            email: string | null;
            image: string;
            phone: string | null;
            address: string | null;
            birthday: Date | null;
        };
        startLocation: string;
        endLocation: string;
        duration: number;
        places: number;
        // car: string;
        // color: string;
        price: number;
        // passengers: {
        //     name: string;
        //     imageUrl: string;
        // }[],
        stops: { name: string; }[]
    }
}