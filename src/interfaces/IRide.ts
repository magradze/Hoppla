export interface IRide {

    ride: {
        id: string;
        startDate: Date | string;
        startTime: string;
        name: string;
        driver: {
            name: string | null;
            email: string | null;
            image: string;
            phone: string | null;
            address: string | null;
            birthday: Date | null;
        };
        from: string;
        to: string;
        duration: number;
        seats: number;
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