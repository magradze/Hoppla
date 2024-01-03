import carpoolBg from "@/assets/carpoolbg.svg";
import RideList from "@/components/rides/RideList";
import PageHeader from "@/components/shared/PageHeader";
import RideCalendarFilter from "@/components/rides/RideCalendarFilter";

const CarPool = async () => {
    return (
        <div className="relative isolate z-10">
            <PageHeader
                title="მსუბუქი ავტომობილები"
                subtitle="Find a ride to your destination"
                image={carpoolBg}
            />
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="py-10 sm:py-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <RideList/>
                            </div>
                            <div className="lg:col-span-1">
                                <RideCalendarFilter/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarPool;