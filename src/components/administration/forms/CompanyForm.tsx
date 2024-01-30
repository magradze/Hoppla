import React from 'react';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {CompanyScheme} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {createCompany} from "@/lib/actions/companies";

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Button, Input} from "@nextui-org/react";
import {useRouter} from "next/navigation";

const CompanyForm = ({...props}: {
    onClose: () => void;
}) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof CompanyScheme>>({
        resolver: zodResolver(CompanyScheme),
        defaultValues: {
            name: "",
            address: "",
            email: "",
            phone: "",
            logo: "",
            description: "",
        }
    });

    const handleSubmit = async (values: z.infer<typeof CompanyScheme>) => {
        await createCompany(values)
        props.onClose();
        router.refresh()
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pb-6">
                <FormField
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input className="max-w-full fira-go" type="text" label="კომპანიის სახელი"
                                       placeholder="შპს ჰოპლა" {...field}/>
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="address"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input className="max-w-full fira-go" type="text" label="მისამართი"
                                       placeholder="მისამართი" {...field}/>
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input className="max-w-full fira-go" type="text" label="ელ-ფოსტა"
                                       placeholder="ელ-ფოსტა" {...field}/>
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}

                />

                <FormField
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input className="max-w-full fira-go" type="text" label="ტელეფონი"
                                       placeholder="ტელეფონი" {...field}/>
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="logo"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input className="max-w-full fira-go" type="file" label="ლოგო"
                                       placeholder="ლოგო" {...field}/>
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input className="max-w-full fira-go" type="text" label="აღწერა"
                                       placeholder="აღწერა" {...field}/>
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <div className="flex flex-row justify-end gap-2">
                    <Button className="fira-go" color="danger" variant="light" onClick={props.onClose}>
                        გაუქმება
                    </Button>
                    <Button className="fira-go" type="submit" color="secondary">
                        დამატება
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CompanyForm;
