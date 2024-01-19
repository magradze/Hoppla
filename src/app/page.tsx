import Hero from "@/components/partial/Hero";
import {getDictionary} from "@/dictionaries";
import DailyRides from "@/components/rides/DailyRides";

export default async function Home() {
    const dict = await getDictionary('ka')
    return (
        <main className="relative isolate z-10 py-16">
            <Hero
                // dict={dict}
            />
            {/*{dict.hero.search}*/}
            <div className="page-wrapper mt-40 lg:mt-14">
                <DailyRides/>
            </div>
        </main>
    )
}
