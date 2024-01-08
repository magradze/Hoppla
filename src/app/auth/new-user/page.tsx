import Image from "next/image";
import confirmReg from "@/assets/reg-complete.svg";
import RegisterConfirmForm from "@/components/auth/RegisterConfirmForm";
import {getServerSession} from "next-auth";

import prisma from "@/lib/prisma";

import {getUserByEmail} from "@/lib/data/user";

const NewUser = async () => {

    const session = await getServerSession()

    const user = await getUserByEmail(String(session?.user?.email))

    const provider = await prisma.account.findFirst({
        where: {
            userId: user?.id
        }
    })

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-8 items-center">
            <div className="w-full md:w-1/2 flex justify-center items-start">
                <Image src={confirmReg} alt={"Car Pool Image"} width={500} height={500} priority={true}/>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <div className="flex flex-col justify-center items-center w-full lg:px-14">
                    <RegisterConfirmForm/>
                </div>
            </div>
        </div>
    );
};

export default NewUser;
