"use client"
import SiteSettingsContext from "@/context/siteSettingsContext";
import {ReactNode} from "react";
import {User} from "next-auth";
import {useSession} from "next-auth/react";

interface SiteSettingsProviderProps {
    children: ReactNode;
}

const SiteSettingsProvider = ({children}: SiteSettingsProviderProps) => {

    const value = {
        siteSettings: {
            title: 'Hoppla - Ride with us',
            description: 'გაემგზავრე Hoppla-ით და მიიღე საუკეთესო მანქანა და მარშუტი შენი მიზნისთვის',
        }
    }

    return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export default SiteSettingsProvider;