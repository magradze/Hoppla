import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import SessionProviderWrapper from "@/providers/SessionProvider";
import Navbar from "@/components/partial/NavBar";
import {getDictionary} from "@/dictionaries";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Hoppla - Ride with us',
    description: 'გაემგზავრე Hoppla-ით და მიიღე საუკეთესო მანქანა და მარშუტი შენი მიზნისთვის',
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode,
}) {
    return (
        <html lang="ka">
        <body className={inter.className}>
        <SessionProviderWrapper>
            <Navbar/>
            {children}
        </SessionProviderWrapper>
        </body>
        </html>
    )
}
