import Image from 'next/image'
import AuthBlock from "@/components/partial/AuthBlock";
import Hero from "@/components/partial/Hero";

export default function Home() {
    return (
        <main className="flex flex-col">
            <Hero/>
            <AuthBlock/>
        </main>
    )
}
