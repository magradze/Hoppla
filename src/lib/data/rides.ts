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