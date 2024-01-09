"use client"
import React from 'react';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {UserSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import EditableInput from "@/components/dashboard/inputs/EditableInput";
import {Button} from "@/components/ui/button";
import {updateUser} from "@/lib/data/user";

const EditProfileForm = ({user}: { user: any }) => {

    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            address: user?.address,
        }
    });

    const handleSubmit = async (values: z.infer<typeof UserSchema>) => {
        await updateUser(user?.id, values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
                  className="mt-6 space-y-4 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <FormField
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <EditableInput
                                    label="სახელი"
                                    {...field}
                                    placeholder={"სახელი გვარი"}
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage className="alk-sanet text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <EditableInput
                                    label="ელ.ფოსტა"
                                    {...field}
                                    placeholder={"johndoe@hoppla.ge"}
                                    type="email"
                                />
                            </FormControl>
                            <FormMessage className="alk-sanet text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <EditableInput
                                    label="ტელეფონი"
                                    {...field}
                                    placeholder={"577123456"}
                                    type="tel"
                                />
                            </FormControl>
                            <FormMessage className="alk-sanet text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="address"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <EditableInput
                                    label="მისამართი"
                                    {...field}
                                    placeholder={"მაგ: თბილისი, ვაჟა-ფშაველას გამზირი"}
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage className="alk-sanet text-[10px]"/>
                        </FormItem>
                    )}
                />

            </form>
        </Form>
    );
};

export default EditProfileForm;
