"use client"
import React, {ReactNode} from 'react';
import {Listbox, ListboxItem, ListboxSection} from "@nextui-org/react";
import {Building, Car, Cog, CreditCard, Gem, Home, SignpostBig, Users} from "lucide-react";
import {cn} from "@/lib/utils";

export const ListboxWrapper = ({children}: { children: ReactNode }) => (
    <div
        className="w-full h-min bg-white shadow-md px-1 py-2 rounded-small fira-go">
        {children}
    </div>
);

const AdminSidebarMenu = () => {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <ListboxWrapper>
            <Listbox variant="flat" aria-label="Listbox menu with sections">

                <ListboxSection title="ნავიგაცია" showDivider>
                    <ListboxItem
                        href={"/management"}
                        key="home"
                        description="ადმინპანელის მთავარი გვერდი"
                        startContent={<Home className={iconClasses}/>}
                    >
                        მთავარი გვერდი
                    </ListboxItem>
                    <ListboxItem
                        href={"/management/users"}
                        key="users"
                        description="დამატება, წაშლა, რედაქტირება"
                        startContent={<Users className={iconClasses}/>}
                    >
                        მომხმარებლები
                    </ListboxItem>
                    <ListboxItem
                        key="promos"
                        description="აქციების მართვა"
                        startContent={<Gem className={iconClasses}/>}
                    >
                        აქციები
                    </ListboxItem>
                    <ListboxItem
                        key="directions"
                        description="მარშრუტების მართვა"
                        startContent={<SignpostBig className={iconClasses}/>}
                    >
                        მარშრუტები
                    </ListboxItem>
                    <ListboxItem
                        key="cars"
                        description="ავტომობილების მართვა"
                        startContent={<Car className={iconClasses}/>}
                    >
                        ავტომობილები
                    </ListboxItem>
                    <ListboxItem
                        href={"/management/companies"}
                        key="companies"
                        description="კომპანიების მართვა"
                        startContent={<Building className={iconClasses}/>}
                    >
                        სამარშრუტო კომპანიები
                    </ListboxItem>
                </ListboxSection>
                <ListboxSection title="მართვა">
                    <ListboxItem
                        key="payments"
                        description="მეთოდების მართვა"
                        startContent={<CreditCard className={cn(iconClasses)}/>}
                    >
                        გადახდის მეთოდები
                    </ListboxItem>
                    <ListboxItem
                        key="settings"
                        description="საიტის პარამეტრები"
                        startContent={<Cog className={cn(iconClasses)}/>}
                    >
                        პარამეტრები
                    </ListboxItem>
                </ListboxSection>
            </Listbox>
        </ListboxWrapper>
    );
};

export default AdminSidebarMenu;
