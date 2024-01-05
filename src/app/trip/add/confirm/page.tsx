import * as React from "react";
import TripConfirmForm from "@/components/shared/forms/TripConfirmForm";
import prisma from "@/lib/prisma";
import {getServerSession} from "next-auth";

const AddPageConfirm = async ({searchParams}: {
    searchParams: {
        from: string,
        to: string,
        distance: number,
        duration: number,
        price: string,
        seats: number,
    }
}) => {

    const session = await getServerSession()

    if (!session || !session.user) return null

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }
    })

    return (
        <>
            <main
                className="page-wrapper flex flex-col-reverse lg:flex lg:min-h-full lg:flex-row-reverse gap-4 p-4 lg:p-8">
                <TripConfirmForm user={user} searchParams={searchParams}/>
            </main>
        </>
    );
};

export default AddPageConfirm;
