import {User} from "@prisma/client";

export interface IRideConfirm {
    user: User | null,
    searchParams: {
        from: string,
        to: string,
        distance: number,
        duration: number,
        price: string,
        seats: number,
    }
}