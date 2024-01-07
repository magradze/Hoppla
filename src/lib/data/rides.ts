"use server"
import prisma from "@/lib/prisma";
import {IRide} from "@/interfaces/IRide";

// find all rides
export const getRides = async () => {
    try {
        return await prisma.ride.findMany({
            include: {
                driver: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                        address: true,
                        birthday: true,
                    }
                },
                stops: {
                    select: {
                        name: true,
                    }

                }
            }
        });
    } catch (error) {
        return null;
    }
}

// find ride by id
export const getRideById = async (id: string) => {
    try {
        return await prisma.ride.findUnique({
            where: {
                id,
            },
        });
    } catch (error) {
        return null;
    }
}

// find ride by date
export const getRideByDate = async (date: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                startDate: date.split('T')[0],
            },
            include: {
                driver: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                        address: true,
                        birthday: true,
                    }
                },
                stops: {
                    select: {
                        name: true,
                    }

                }
            }
        });
    } catch (error) {
        return null;
    }
}

// find ride by driver id
export const getRideByDriverId = async (id: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                userId: id,
            },
            include: {
                driver: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                        address: true,
                        birthday: true,
                    }
                },
                stops: {
                    select: {
                        name: true,
                    }

                }
            }
        });
    } catch (error) {
        return null;
    }
}

// create ride
export const createRide = async (ride: IRide): Promise<any> => {
    try {
        const res = await prisma.ride.create({
            data: {
                name: ride.name,
                description: ride.description,
                from: ride.from,
                to: ride.to,
                distance: ride.distance,
                duration: ride.duration,
                seats: ride.seats,
                price: ride.price,
                startDate: ride.startDate,
                startTime: ride.startTime,
                driver: {
                    connect: {
                        id: ride.driver.id
                    }
                },
                stops: {
                    create: ride.stops
                },
                createdAt: new Date(),
            },
            include: {
                driver: true,
                stops: true
            }
        });

        console.log(res);

        return res;
    } catch (error) {
        return null;
    }
}