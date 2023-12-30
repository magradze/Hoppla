import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {getServerSession} from "next-auth";
import SessionProvider from "@/providers/SessionProvider";
import Navbar from "@/components/partial/NavBar";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Hoppla - Ride with us',
    description: 'გაემგზავრე Hoppla-ით და მიიღე საუკეთესო მანქანა და მარშუტი შენი მიზნისთვის',
}

export default async function RootLayout({children}: { children: React.ReactNode }) {

    const session = await getServerSession()

    return (
        <html lang="ka">
        <body className={inter.className}>
        <SessionProvider session={session}>
            <Navbar/>
            {children}
        </SessionProvider>
        </body>
        </html>
    )
}
