"use client";
import Image from "next/image";
import carPoolImage from "@/assets/carpool.svg";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-8 px-8">
            <div className="w-full md:w-1/2 flex justify-center items-start">
                <Image src={carPoolImage} alt={"Car Pool Image"} width={500} height={500} priority={true}/>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <div className="flex flex-col justify-center items-center w-full lg:px-14">

                    <LoginForm/>


                </div>
            </div>
        </div>
    );
};

export default Login;
