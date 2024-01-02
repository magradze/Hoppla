"use client";
import {useCurrentUser} from "@/hooks";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {RegisterConfirmSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import FormError from "@/components/shared/forms/FormError";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {confirmRegistration} from "@/lib/data/user";

const RegisterConfirmForm = () => {

    const user = useCurrentUser()
    const router = useRouter()

    const form = useForm<z.infer<typeof RegisterConfirmSchema>>({
        resolver: zodResolver(RegisterConfirmSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: '',
            address: '',
            birthday: ''
        }
    });

    const handleSubmit = async (values: z.infer<typeof RegisterConfirmSchema>) => {
        const res = await confirmRegistration(values)

        if (res) {
            router.push('/profile')
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
                <FormField
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="alk-sanet">
                                სახელი
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={"სახელი"}
                                    type="text"
                                    value={form.getValues("name")}
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
                            <FormLabel className="alk-sanet">
                                ელ.ფოსტა
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={"ელ.ფოსტა"}
                                    type="email"
                                    disabled
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
                            <FormLabel className="alk-sanet">
                                ტელეფონი
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <label htmlFor="country" className="sr-only">
                                            Country
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country"
                                            className="h-full rounded-md border-0 bg-transparent py-0 pl-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm alk-sanet"
                                        >
                                            <option>საქ</option>
                                        </select>
                                    </div>
                                    <Input
                                        {...field}
                                        placeholder={"მაგ: 555 11 22 33"}
                                        type="text"
                                        className="pl-16"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage className="alk-sanet text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="address"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="alk-sanet">
                                მისამართი
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={"მაგ: თბილისი, ვაჟა-ფშაველას გამზირი"}
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage className="alk-sanet text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="birthday"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="alk-sanet">
                                დაბადების თარიღი
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={"დაბადების თარიღი"}
                                    type="date"
                                />
                            </FormControl>
                            <FormMessage className="alk-sanet text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormError
                    message={form.formState.errors.name?.message || form.formState.errors.email?.message || form.formState.errors.phone?.message || form.formState.errors.address?.message || form.formState.errors.birthday?.message}/>

                <Button
                    variant="secondary"
                    size="lg"
                    type="submit"
                    className={"w-full mt-4"}
                >
                    რეგისტრაციის დასრულება
                </Button>
            </form>
        </Form>
    );
};

export default RegisterConfirmForm;
