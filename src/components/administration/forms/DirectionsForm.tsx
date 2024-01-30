"use client"
import React from 'react';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {DirectionScheme} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {createDirection} from "@/lib/actions/directions";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Button, Chip, Input} from "@nextui-org/react";
import {Banknote, Locate, PenTool} from "lucide-react";
import {StopsInput} from "@/components/shared/inputs/StopsInput";
import {cn} from "@/lib/utils";

const DirectionsForm = () => {


    const [stops, setStops] = React.useState<string[]>([])
    const [value, setValue] = React.useState<string>("")

    const form = useForm<z.infer<typeof DirectionScheme>>({
        resolver: zodResolver(DirectionScheme),
        defaultValues: {
            name: "",
            from: "",
            fromLat: 0,
            fromLong: 0,
            to: "",
            toLat: 0,
            toLong: 0,
            distance: 0,
            duration: 0,
            stops: stops,
            price: 0 as number,
        }
    });

    const handleStops = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setStops([...stops, e.currentTarget.value])
            form.setValue("stops", [...stops, e.currentTarget.value])
            e.currentTarget.value = ""
            setValue("")
        }
    }

    const handleSubmit = async (values: z.infer<typeof DirectionScheme>, e: any) => {
        e.preventDefault();
        await createDirection(values)
        // router.refresh()
    };

    const onStopsClear = React.useCallback(() => {
        setStops([])
        setValue("")
        form.setValue("stops", [])
    }, [form])

    return (
        <Form {...form}>
            <form onSubmit={
                (e) => handleSubmit(form.getValues(), e)
            } className="space-y-2 py-6 grid grid-cols-2 gap-4">
                <h2 className="col-span-2 flex gap-2 justify-start items-center">
                    <PenTool size={20}/>
                    <span className="fira-go text-xl">მარშუტის დამატება</span>
                </h2>

                <FormField
                    name="from"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input className="max-w-full fira-go" type="text" label="საიდან"
                                       startContent={<Locate size={20}/>}
                                       placeholder="თბილისი" {...field}/>
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="to"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input className="max-w-full fira-go" type="text" label="სად"
                                       startContent={<Locate size={20}/>}
                                       placeholder="ბათუმი" {...field}/>
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="stops"
                    render={({field}) => (
                        <FormItem className="space-y-2 relative">
                            <FormControl>
                                <StopsInput stopValue={value}
                                            setStopValue={setValue} {...form.register("stops")}{...field}
                                            onKeyPress={handleStops}
                                            onClear={onStopsClear}/>
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                            <div
                                className={cn(stops.length > 0 ? "flex gap-2" : "hidden")}>
                                {stops.map((stop, index) => (
                                    <Chip key={index} className="fira-go w-auto" color="default" size="sm" radius="sm"
                                          variant="faded"
                                          onClose={() => {
                                              setStops(stops.filter((s) => s !== stop))
                                              form.setValue("stops", stops.filter((s) => s !== stop))
                                          }}>
                                        {stop}
                                    </Chip>
                                ))}
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    name="price"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input className="max-w-full fira-go" type="number" label="ფასი"
                                       startContent={<Banknote size={20}/>}
                                       placeholder="25" {...field}/>
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <div className="col-span-2 flex flex-row gap-4 justify-between">
                    <div className="flex flex-row justify-start items-center gap-4 px-4 bg-gray-100 w-full rounded-xl">
                        <span className="fira-go text-[10px]">მანძილი: </span>
                        <span className="fira-go text-[10px]">ხანგრძლივობა: </span>
                    </div>
                    <Button className="max-w-full fira-go" type="submit" color="primary" size="lg">
                        დამატება
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default DirectionsForm;
