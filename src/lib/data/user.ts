"use server"
import prisma from "@/lib/prisma";
import * as z from "zod";
import {RegisterConfirmSchema, UserSchema} from "@/lib/validation";
import {Prisma} from ".prisma/client";
import EnumRoleFilter = Prisma.EnumRoleFilter;

import * as bcrypt from "bcrypt";

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

// get user auth provider
export const getUserAuthProvider = async (id: string) => {
    try {
        return await prisma.account.findFirst({
            where: {
                userId: id,
            }
        });
    } catch (error) {
        return null
    }
}

// Confirm registration
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

// Update user
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

// Update user password
export const updateUserPassword = async (id: string, data: {
    newPassword: string,
    confirmPassword: string,
}) => {

    const {newPassword, confirmPassword} = data;

    if (newPassword !== confirmPassword) {
        return null;
    }

    const password = await bcrypt.hash(newPassword, 10);

    try {
        return await prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            },
        });
    } catch (error) {
        console.log("ERROR", error);
    }
}