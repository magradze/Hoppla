"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {LoginSchema} from "@/lib/validation";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"

import LoginFormWrapper from "@/components/auth/LoginFormWrapper";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {Input} from "@/components/ui/input";
import FormError from "@/components/shared/forms/FormError";

const LoginForm = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
        await signIn("credentials", {
            redirect: true,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })
    };

    return (
        <LoginFormWrapper
            headerLabel={"მოგესალმებით"}
            headerDescription={"გთხოვთ შეიყვანოთ თქვენი მონაცემები."}
            buttonText={"არ გაქვთ ანგარიში?"}
            buttonHref={"/auth/register"}
            showSocialButtons
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-6">
                    <FormField
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="alk-sanet">
                                    ელ.ფოსტა
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={"john.doe@hoppla.ge"}
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage className="alk-sanet text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="alk-sanet">
                                    პაროლი
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={"********"}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage className="alk-sanet text-[10px]"/>
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
                        ავტორიზაცია
                    </Button>

                </form>
            </Form>
        </LoginFormWrapper>
    );
};

export default LoginForm;
