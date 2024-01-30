"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {LoginSchema} from "@/lib/validation";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"

import LoginFormWrapper from "@/components/auth/LoginFormWrapper";
import {signIn} from "next-auth/react";
import FormError from "@/components/shared/forms/FormError";
import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {KeySquare, Mail} from "lucide-react";

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
                                {/*<FormLabel className="fira-go">*/}
                                {/*    ელ.ფოსტა*/}
                                {/*</FormLabel>*/}
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="fira-go"
                                        placeholder={"john.doe@hoppla.ge"}
                                        type="email"
                                        autoComplete="email"
                                        label={"ელ.ფოსტა"}
                                        startContent={<Mail className="w-4"/>}
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
                                {/*<FormLabel className="fira-go">*/}
                                {/*    პაროლი*/}
                                {/*</FormLabel>*/}
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={"********"}
                                        type="password"
                                        autoComplete="current-password"
                                        label={"პაროლი"}
                                        className="fira-go"
                                        startContent={<KeySquare className="w-4"/>}
                                    />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormError
                        message={form.formState.errors.email?.message || form.formState.errors.password?.message}/>

                    <Button
                        variant="solid"
                        color="secondary"
                        size="lg"
                        type="submit"
                        className={"w-full fira-go"}
                    >
                        ავტორიზაცია
                    </Button>

                </form>
            </Form>
        </LoginFormWrapper>
    );
};

export default LoginForm;
