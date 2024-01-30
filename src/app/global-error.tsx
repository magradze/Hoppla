'use client'

import {NextUIProvider, UserProvider} from "@/providers";
import SiteSettingsProvider from "@/providers/SiteSettingsProvider";
import Navbar from "@/components/partial/NavBar";
import Footer from "@/components/partial/Footer";

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
        <body>
        <NextUIProvider>
            <SiteSettingsProvider>
                <UserProvider>
                    <Navbar/>
                    {error.message}
                    <br/>
                    {error.stack && <pre>{error.stack}</pre>}
                    <br/>
                    <button onClick={reset}>Reset</button>
                    <Footer/>
                </UserProvider>
            </SiteSettingsProvider>
        </NextUIProvider>
        </body>
        </html>
    )
}