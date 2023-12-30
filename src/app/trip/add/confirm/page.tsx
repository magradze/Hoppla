import * as React from "react";
import TripConfirmForm from "@/components/shared/forms/TripConfirmForm";
import prisma from "@/lib/prisma";
import {getServerSession} from "next-auth";

const AddPageConfirm = async () => {

    const session = await getServerSession()

    if (!session || !session.user) return null

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }
    })

    return (
        <>
            <main className="page-wrapper flex flex-col-reverse lg:flex lg:min-h-full lg:flex-row-reverse gap-4">
                <TripConfirmForm user={user}/>
            </main>
        </>
    );
};

export default AddPageConfirm;
