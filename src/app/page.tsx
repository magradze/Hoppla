import Hero from "@/components/partial/Hero";
import {getDictionary} from "@/dictionaries";

export default async function Home() {
    const dict = await getDictionary('ka')
    return (
        <main className="flex flex-col pt-16">
            <Hero
                // dict={dict}
            />
            {/*{dict.hero.search}*/}
            <div className="page-wrapper mt-40 lg:mt-14">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">რა არის Hoopla?</h2>
                        <p className="text-gray-500">Hoopla არის საქართველოში პირველი მოგზაურობის პლატფორმა,
                            რომელიც გთავაზობთ საუკეთესო გზავნილებს და მისაღები საშუალებებს მათი მარშრუტის
                            განსახილველად.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">რატომ Hoopla?</h2>
                        <p className="text-gray-500">არსებობს რამდენიმე მსურველი, რომელთაც საჭიროა გადახდო მანქანის
                            გარეშე, ან
                            მანქანის მიერ გადახდილი სასტუმროს გარეშე. ასევე არსებობს რამდენიმე მსურველი, რომელთაც
                            საჭიროა გადახდო მანქანის გარეშე, ან
                            მანქანის მიერ გადახდილი სასტუმროს გარეშე.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">როგორ მუშაობს Hoopla?</h2>
                        <p className="text-gray-500">პლატფორმა მუშაობს შემდეგნაირად: მანქანის მიერ გადახდილი სასტუმროს
                            გარეშე. ასევე არსებობს რამდენიმე მსურველი, რომელთაც საჭიროა გადახდო მანქანის გარეშე, ან
                            მანქანის მიერ გადახდილი სასტუმროს გარეშე.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
