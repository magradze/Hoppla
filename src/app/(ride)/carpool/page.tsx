import SearchBox from "@/components/partial/SearchBox";
import InfoBlock from "@/components/shared/InfoBlock";
import phoneFrame from '@/assets/phone-frame.svg'
import DailyRides from "@/components/rides/DailyRides";

const CarPool = async () => {
    return (
        <div className="relative isolate z-10">
            <SearchBox className="page-wrapper my-8" type="carpool"/>
            <InfoBlock image={phoneFrame} title={"ისიამოვნე მოგზაურობის უკეთესი გამოცდილებით, Hoopla-სთან ერთად."}
                       subtitle="იმოგზაურეთ საქართველოს ნებისმიერი მიმართულებით, მიიღეთ უახლესი ინფორმაცია და დაჯავშნეთ ბილეთები სმარტფონით."/>
            <div className="page-wrapper">
                <DailyRides/>
            </div>
        </div>
    );
};

export default CarPool;