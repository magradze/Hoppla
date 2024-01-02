"use server"
import prisma from "@/lib/prisma";
import * as z from "zod";
import {RegisterConfirmSchema} from "@/lib/validation";

// find user by id
export const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    } catch (error) {
        return null;
    }
}

// find user by email
export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    } catch (error) {
        return null;
    }
}

// find users with role
export const getUsersWithRole = async (role: string) => {
    try {
        return await prisma.user.findMany({
            where: {
                role,
            },
        });
    } catch (error) {
        return null;
    }
}

export const confirmRegistration = async (values: z.infer<typeof RegisterConfirmSchema>) => {
    try {
        const res = await prisma.user.update({
            where: {
                email: values.email,
            },
            data: {
                name: values.name,
                phone: values.phone,
                address: values.address,
                birthday: new Date(values.birthday).toISOString(),
            }
        });

        return res;
    } catch (error) {
        console.log("ERROR", error);
    }
}