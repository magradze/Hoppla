import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {iRideAdd} from "@/interfaces/IRideAdd";

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
        const ride: iRideAdd = await prisma.ride.create({
            data: {
                name: body.name,
                description: body.description,
                from: body.from,
                to: body.to,
                distance: body.distance,
                duration: body.duration,
                seats: body.seats,
                price: body.price,
                startDate: body.startDate,
                startTime: body.startTime,
                driver: {
                    connect: {
                        id: body.driver.id
                    }
                },
                stops: {
                    create: body.stops
                }
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