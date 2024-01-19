"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {RegisterSchema} from "@/lib/validation";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"

import LoginFormWrapper from "@/components/auth/LoginFormWrapper";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {Input} from "@/components/ui/input";
import FormError from "@/components/shared/forms/FormError";


const RegisterForm = () => {

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        await signIn("credentials", {
            redirect: true,
            name: values.name,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })
    };

    return (
        <LoginFormWrapper
            headerLabel={"მოგესალმებით"}
            headerDescription={"გთხოვთ შეიყვანოთ თქვენი მონაცემები."}
            buttonText={"ავტორიზაცია"}
            buttonHref={"/auth/signin"}
            showSocialButtons
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-6">
                    <FormField
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="fira-go">
                                    სახელი და გვარი
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={"ჯონ დოუ"}
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="fira-go">
                                    ელ.ფოსტა
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={"john.doe@hoppla.ge"}
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="fira-go">
                                    პაროლი
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={"********"}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormError
                        message={form.formState.errors.email?.message || form.formState.errors.password?.message}/>

                    <Button
                        variant="secondary"
                        size="lg"
                        type="submit"
                        className={"w-full"}
                    >
                        რეგისტრაცია
                    </Button>

                </form>
            </Form>
        </LoginFormWrapper>
    );
};

export default RegisterForm;
