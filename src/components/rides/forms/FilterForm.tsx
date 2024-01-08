"use client"
import React from 'react';
import {Radio, RadioGroup} from "@nextui-org/radio";
import {cn} from "@/lib/utils";
import {Checkbox, CheckboxGroup, User, Link, Chip} from "@nextui-org/react";
import {ShieldCheck} from "lucide-react";

interface IFilterFormProps {
    children: React.ReactNode;
    className?: {
        base?: string;
    }
    description?: string;
    value?: string;
    selected?: boolean;
}

const filetrs = [
    {
        id: 1,
        title: "ფასის მიხედვით",
        value: "price",
        description: "ყველაზე დაბალი ფასის მიხედვით",
    },
    {
        id: 2,
        title: "დროის მიხედვით",
        value: "time",
        description: "ყველაზე მალე გამსვლელი",
    }
];

export const RadioItem = (props: any) => {
    const {children, ...otherProps} = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
            }}
        >
            {children}
        </Radio>
    );
};

export const CustomCheckbox = ({user, statusColor, value}: {
    user: any;
    statusColor: "default" | "success" | "warning" | "secondary" | "primary" | "danger" | undefined;
    value: string;
}) => {
    return (
        <Checkbox
            aria-label={user.name}
            classNames={{
                base: cn(
                    "inline-flex max-w-md w-full bg-content1 m-0",
                    "hover:bg-content2 items-center justify-start",
                    "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
                label: "w-full",
            }}
            value={value}
        >
            <div className="w-full flex justify-between items-center gap-2">
                <span className="text-sm text-default-500">1</span>
                <div className="flex flex-row justify-center items-center gap-1 text-sm">
                    <span>ვერიფიცირებული მძღოლი</span>
                    <ShieldCheck width={16}/>
                </div>
            </div>
        </Checkbox>
    );
};

const FilterForm = () => {
    const [groupSelected, setGroupSelected] = React.useState([]);

    console.log(groupSelected);

    return (
        <>
            <RadioGroup className="mt-4">
                {filetrs.map((filter) => (
                    <RadioItem className="text-sm" description={filter.description} value={filter.value}
                               key={filter.id}>
                        {filter.title}
                    </RadioItem>
                ))}
            </RadioGroup>

            <CheckboxGroup
                label="Select employees"
                value={groupSelected}
                // @ts-ignore
                onChange={setGroupSelected}
                classNames={{
                    base: "w-full"
                }}
            >
                <CustomCheckbox
                    value="test"
                    user={{
                        name: "John Doe",
                        avatar: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
                        username: "ffff",
                        url: "#",
                        role: "Product Designer",
                        status: "Vacation",
                    }}
                    statusColor="warning"
                />
            </CheckboxGroup>
        </>
    );
};

export default FilterForm;
