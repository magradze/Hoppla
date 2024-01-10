import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import {RegisterSchema} from "@/lib/validation";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const {email, password, name} = await RegisterSchema.parseAsync(body)

    if (!email || !password || !name) new NextResponse("Missing fields", {status: 400})

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (user) {
        return new NextResponse("User already exists", {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            image: "https://gravatar.com/avatar",
            role: "USER",
            accounts: {
                // @ts-ignore
                create: {
                    provider: "credentials",
                    providerAccountId: Math.random().toString(36).substring(7),
                    type: "email",
                },
            }
        },
        include: {
            accounts: true,
        },
    });

    if (!newUser) {
        return new NextResponse("Error creating user", {status: 500})
    }

    return new NextResponse("User created", {status: 200})
}