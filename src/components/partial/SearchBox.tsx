"use client";
import React, {useCallback, useEffect} from 'react';
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {SearchSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
// import {Input} from "@/components/ui/input";
import {CalendarDays, Locate, User} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {Input, Button} from "@nextui-org/react";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import NumberSelector from "@/components/ui/number-selector";
import {useRouter, useSearchParams} from "next/navigation";
import moment from "moment";
import 'moment/locale/ka';
import ka from "date-fns/locale/ka";

const SearchBox = ({className, type}: { className?: string, type: string }) => {

    const [disabled, setDisabled] = React.useState<boolean>(true);

    const searchParams = useSearchParams();

    const router = useRouter();

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            startLocation: searchParams.get("from") || "თბილისი",
            endLocation: searchParams.get("to") || "ბათუმი",
            startDate: searchParams.get("date") ? new Date(moment(searchParams.get("date")).format("YYYY-MM-DD")) : new Date(),
            seats: searchParams.get("seats") ? parseInt(searchParams.get("seats") as string) : 1,
        }
    });

    const createQueryStr = useCallback((values: z.infer<typeof SearchSchema>) => {
        const query = new URLSearchParams(searchParams);
        query.set("from", values.startLocation);
        query.set("to", values.endLocation);
        query.set("date", moment(values.startDate).format("YYYY-MM-DD"));
        query.set("seats", values.seats.toString());
        return query.toString();
    }, [searchParams]);

    const handleSubmit = useCallback((values: z.infer<typeof SearchSchema>) => {
        //${type}/search?${createQueryStr(values)}
        router.push(`/search?${createQueryStr(values)}`)
    }, [router, createQueryStr]);

    useEffect(() => {

        if (!form.getValues().endLocation) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
                  className={cn(className, "rounded-xl grid grid-cols-1 lg:grid-cols-12 lg:justify-between items-center w-full fira-go bg-white overflow-hidden")}>

                <FormField
                    name="startLocation"
                    render={({field}) => (
                        <FormItem className="relative w-full col-span-12 lg:col-span-3">

                            <FormControl>
                                <Input
                                    radius="none"
                                    size="lg"
                                    startContent={<Locate/>}
                                    {...field}
                                    placeholder={"საიდან..."}
                                    type="text"
                                    classNames={{
                                        label: "text-black/50 dark:text-white/90",
                                        input: [
                                            "bg-transparent",
                                            "text-black/90 dark:text-white/90",
                                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "bg-white text-gray-400",
                                        ],
                                    }}
                                />
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="endLocation"
                    render={({field}) => (
                        <FormItem className="relative w-full col-span-12 lg:col-span-3">
                            <FormControl>
                                <Input
                                    radius="none"
                                    size="lg"
                                    startContent={<Locate/>}
                                    {...field}
                                    placeholder={"სად..."}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        if (!e.target.value) {
                                            setDisabled(true);
                                        } else {
                                            setDisabled(false);
                                        }
                                    }}
                                    type="text"
                                    classNames={{
                                        label: "text-gray-400",
                                        input: [
                                            "bg-transparent",
                                            "text-gray-400",
                                            "placeholder:text-gray-400",
                                        ],
                                        innerWrapper: "bg-transparent text-gray-400",
                                        inputWrapper: [
                                            "bg-white text-gray-400",
                                        ],
                                    }}
                                />
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="startDate"
                    render={({field}) => (
                        <FormItem className="flex flex-col col-span-2 lg:col-span-2 h-16">
                            <Popover placement="bottom-end">
                                <PopoverTrigger>

                                    <FormControl>
                                        <Button
                                            variant="light"
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
                                                moment(field.value).locale('ka').calendar(
                                                    null,
                                                    {
                                                        sameDay: '[დღეს]',
                                                        nextDay: '[ხვალ]',
                                                        nextWeek: 'LL',
                                                        lastDay: '[გუშინ]',
                                                        lastWeek: 'LL',
                                                        sameElse: 'LL'
                                                    }
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[240px] fira-go p-0">
                                    <Calendar
                                        locale={ka}
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => {
                                            return moment(date).isBefore(moment().subtract(0, 'day'), 'day')
                                        }}
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
                        <FormItem className="flex flex-col col-span-6 lg:col-span-1 h-16">
                            <Popover placement="bottom-end">
                                <PopoverTrigger>

                                    <FormControl>
                                        <Button
                                            variant="light"
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
                                <PopoverContent>
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
                    variant="solid"
                    color="secondary"
                    size="lg"
                    type="submit"
                    className="col-span-12 lg:col-span-3 rounded-t-none lg:rounded-l-none lg:rounded-r-xl py-8 disabled:cursor-not-allowed disabled:opacity-85"
                    onClick={() => {
                        router.push(`/search?${createQueryStr(form.getValues())}`)
                    }}
                    disabled={disabled}
                >

                    ძებნა
                </Button>
            </form>
        </Form>
    );
};

export default SearchBox;
