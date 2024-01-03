import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

interface iRideConfirm {
    name: string;
    description: string | null;
    startLocation: string;
    endLocation: string;
    distance: number;
    duration: number;
    places: number;
    price: number;
    startDate: Date;
    driver: {
        id: string | number;
    };
    stops: {
        name: string;
    }[];
    createdAt: Date | null;
}

export async function GET() {
    try {
        const rides = await prisma.ride.findMany({
            include: {
                driver: true,
                stops: true
            }
        });
        return NextResponse.json(rides);
    } catch (err) {
        return NextResponse.json({error: err});
    }
}


export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const ride: iRideConfirm = await prisma.ride.create({
            data: {
                name: body.name,
                description: body.description,
                startLocation: body.startLocation,
                endLocation: body.endLocation,
                distance: body.distance,
                duration: body.duration,
                places: body.places,
                price: body.price,
                startDate: body.startDate,
                driver: {
                    connect: {
                        id: body.driver.id
                    }
                },
                stops: {
                    create: body.stops
                },
                createdAt: new Date(),
            },
            include: {
                driver: true,
                stops: true
            }
        });

        return NextResponse.json(ride);
    } catch (err) {
        return NextResponse.json({error: err});
    }
}