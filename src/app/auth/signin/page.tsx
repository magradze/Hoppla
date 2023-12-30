"use client";
import Image from "next/image";
import carPoolImage from "@/assets/carpool.svg";
import Link from "next/link";
import LoginWithGoogle from "@/components/shared/buttons/LoginWithGoogle";
import LoginWithCredentials from "@/components/shared/forms/LoginWithCredentials";
import OrDivider from "@/components/shared/dividers/OrDivider";

const Login = () => {


    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-8 px-8">
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <Image src={carPoolImage} alt={"Car Pool Image"} width={500} height={500} priority={true}/>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full md:w-96">
                        <h1 className="text-3xl font-bold alk-sanet">მოგესალმებით</h1>
                        <p className="text-gray-500 mt-4 alk-sanet">გთხოვთ შეიყვანოთ თქვენი მონაცემები.</p>
                        <LoginWithCredentials/>

                        {/* or divide line */}
                        <OrDivider/>

                        <div className="flex items-center justify-center mt-6">

                            <LoginWithGoogle/>

                        </div>
                        <div className="flex items-center justify-center mt-6">
                            <div className="flex items-center">
                                <div className="text-sm">
                                    <Link href="#"
                                          className="font-medium text-secondary hover:text-secondary alk-sanet">
                                        არ გაქვთ ანგარიში?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
