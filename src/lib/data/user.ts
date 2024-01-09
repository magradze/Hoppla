"use server"
import prisma from "@/lib/prisma";
import * as z from "zod";
import {RegisterConfirmSchema, UserSchema} from "@/lib/validation";
import {Prisma} from ".prisma/client";
import EnumRoleFilter = Prisma.EnumRoleFilter;

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
export const getUsersWithRole = async (role: EnumRoleFilter) => {
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
        return await prisma.user.update({
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
    } catch (error) {
        console.log("ERROR", error);
    }
}

export const updateUser = async (id: string, data: z.infer<typeof UserSchema>) => {
    try {
        return await prisma.user.update({
            where: {
                id,
            },
            data,
        });
    } catch (error) {
        console.log("ERROR", error);
    }
}