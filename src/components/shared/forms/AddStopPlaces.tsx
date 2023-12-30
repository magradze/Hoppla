"use client";
import {ChangeEvent, useEffect, useState} from 'react';
import {Check, Plus, Waypoints, X} from "lucide-react";
import Button from "@/components/shared/buttons/Button";
import * as React from "react";
import {useFieldArray, useForm} from "react-hook-form";

const AddStopPlaces = ({
                           stopPlaceField,
                           setStopPlaceField,
                           disabled,
                           setDisable
                       }: {
    stopPlaceField: { name: string }[],
    setStopPlaceField: React.Dispatch<React.SetStateAction<{ name: string }[]>>
    disabled: boolean,
    setDisable: React.Dispatch<React.SetStateAction<boolean>>
}) => {


    const {register, handleSubmit, formState: {errors}, control} = useForm({
        defaultValues: {
            place: [{
                name: ""
            }]
        }
    });
    const {fields, append, prepend, remove, swap, move, insert, update} = useFieldArray({
        control,
        name: "place"
    });

    const onSubmit = (data: any) => {
        setStopPlaceField(data.place)
        setDisable(false)
        console.log(data)
    };

    useEffect(() => {
        if (fields.length >= 2 || fields.length === undefined) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [fields, fields.length, setDisable]);

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
                <label htmlFor="price"
                       className="block text-xs font-medium leading-6 mb-1 text-gray-900 alk-sanet">
                    გაჩერების დამატება (არასავალდებულო)
                </label>

                {fields.map(({id}, index: number) => {
                    return (
                        <div key={index} className="relative w-full h-12 lg:h-16 rounded-md mb-4">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <Waypoints/>
                            </div>
                            <input
                                type="text"
                                // name="stopPlace"
                                id="stopPlace"
                                className="block w-full h-12 lg:h-16 rounded-md border border-gray-300 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 alk-sanet"
                                placeholder="დამატებითი გაჩერება"
                                {...register(`place.${index}.name` as const, {required: true})}
                                // onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                //     setStopPlaceField(prevState => {
                                //         const newState = [...prevState]
                                //         newState[index].place = e.target.value
                                //         return newState
                                //     })
                                // }}
                            />
                            <div
                                className="absolute top-0 right-0 h-full flex justify-center items-center px-1 lg:px-3">
                                <button
                                    onClick={remove.bind(null, index)}
                                    className="px-3 py-2 text-gray-400 hover:text-gray-500 disabled:invisible"
                                    disabled={fields.length === 1}
                                >
                                    <X width={14} height={14}/>
                                </button>
                                <Button
                                    onClick={handleSubmit(onSubmit)}
                                    className="block w-10 h-10 text-gray-400 hover:text-gray-500 bg-lime-600"
                                >
                                    <Check color="white"/>
                                </Button>
                            </div>
                        </div>

                    )
                })}
                <div>
                    <Button onClick={() => append({name: ""})} className={"bg-primary text-white mb-4"}
                    >
                        დამატებითი გაჩერების დამატება
                    </Button>
                </div>
            </form>
        </>
    );
};

export default AddStopPlaces;
