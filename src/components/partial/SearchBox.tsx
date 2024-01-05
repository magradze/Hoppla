"use client";
import React, {useCallback} from 'react';
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {SearchSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {CalendarDays, Locate, User} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import NumberSelector from "@/components/ui/number-selector";
import {useRouter, useSearchParams} from "next/navigation";

const SearchBox = ({className, type}: { className: string, type: string }) => {

    const searchParams = useSearchParams();

    const router = useRouter();

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            startLocation: searchParams.get("from") || "",
            endLocation: searchParams.get("to") || "",
            startDate: searchParams.get("date") ? new Date(searchParams.get("date") as string) : new Date(),
            seats: searchParams.get("seats") ? parseInt(searchParams.get("seats") as string) : 1,
        }
    });

    const createQueryStr = useCallback((values: z.infer<typeof SearchSchema>) => {
        const query = new URLSearchParams(searchParams);
        query.set("from", values.startLocation);
        query.set("to", values.endLocation);
        query.set("date", values.startDate.toISOString());
        query.set("seats", values.seats.toString());
        return query.toString();
    }, [searchParams]);

    const handleSubmit = useCallback((values: z.infer<typeof SearchSchema>) => {
        router.push(`/${type}/search?${createQueryStr(values)}`)
    }, [router, type, createQueryStr]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
                  className={cn(className, "bg-white rounded-md grid grid-cols-1 lg:grid-cols-12 lg:justify-between items-center w-full alk-sanet")}>

                <FormField
                    name="startLocation"
                    render={({field}) => (
                        <FormItem className="relative w-full h-16 rounded-md col-span-12 lg:col-span-3">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 ">
                                <Locate/>
                            </div>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={"საიდან..."}
                                    type="text"
                                    className="block w-full h-full rounded-t-md rounded-b-none md:rounded-l-md md:rounded-r-none border border-gray-100 border-b-0 md:border-b py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 space-y-0"
                                />
                            </FormControl>
                            <FormMessage className="alk-sanet text-[10px]"/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="endLocation"
                    render={({field}) => (
                        <FormItem className="relative w-full h-16 rounded-md col-span-12 lg:col-span-3">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 ">
                                <Locate/>
                            </div>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={"სად..."}
                                    type="text"
                                    className="block w-full h-full rounded-none border border-gray-100 md:border-l-0 border-b-0 md:border-b py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </FormControl>
                            <FormMessage className="alk-sanet text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="startDate"
                    render={({field}) => (
                        <FormItem className="flex flex-col col-span-2 lg:col-span-2 h-full">
                            <Popover>
                                <PopoverTrigger asChild>

                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "relative w-full h-full rounded-none border border-gray-100 md:border-l-0 bg-white py-5 pl-10 text-gray-400 placeholder:text-gray-400 sm:text-sm sm:leading-6",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <div
                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                                <CalendarDays/>
                                            </div>
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[240px] p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}

                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="seats"
                    render={({field}) => (
                        <FormItem className="flex flex-col col-span-6 lg:col-span-1 h-full">
                            <Popover>
                                <PopoverTrigger asChild>

                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "relative w-full h-full rounded-none border border-gray-100 md:border-l-0 bg-white  py-5 pl-10 text-gray-400 placeholder:text-gray-400 sm:text-sm sm:leading-6",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <div
                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                                <User/>
                                            </div>
                                            {field.value ? (field.value) : (<span>1</span>)}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="absolute lg:relative lg:w-[260px] p-0" align="start">
                                    <FormControl>
                                        <NumberSelector
                                            type="hidden"
                                            {...field}
                                        />
                                    </FormControl>
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />

                <Button
                    variant="secondary"
                    size="lg"
                    type="submit"
                    className="col-span-12 lg:col-span-3 rounded-t-none lg:rounded-l-none lg:rounded-r-md disabled:opacity-80 py-8"
                    // disabled={!form.getFieldState("startLocation").isDirty || form.getFieldState("endLocation").invalid}
                    onClick={() => {
                        router.push(`/${type}/search?${createQueryStr(form.getValues())}`)
                    }}
                >

                    ძებნა
                </Button>
            </form>
        </Form>
    );
};

export default SearchBox;
