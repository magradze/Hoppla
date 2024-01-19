import prisma from "@/lib/prisma";
import moment from "moment";

export async function getStats(userId: string) {

    const cars = await prisma.car.count({
        where: {
            userId: userId
        }
    });

    const rides = await prisma.ride.findMany({
        where: {
            userId: userId,
            status: "COMPLETED"
        },
        select: {
            createdAt: true,
        }
    });

    const earnings = await prisma.ride.findMany({
        where: {
            userId: userId,
            status: "COMPLETED"
        },
        select: {
            price: true,
            status: true,
            createdAt: true,
        }
    });

    const compareLastMonthRides = (rides: any) => {

        const currentMonth = moment().startOf('month').format('M');
        const lastMonth = moment().subtract(1, "month").format('M');

        const currentMonthRides = rides.filter((ride: any) => moment(ride.createdAt).format('M') === currentMonth);
        const lastMonthRides = rides.filter((ride: any) => moment(ride.createdAt).format('M') === lastMonth);

        const percent = `${Math.round((currentMonthRides.length / rides.length) * 100)}%` || "0%";
        const status = currentMonthRides.length > lastMonthRides.length ? "increase" : "decrease";

        return {percent, status};
    }

    const compareLastMonthEarnings = (earnings: any) => {

        const currentMonth = moment().startOf('month').format('M');
        const lastMonth = moment().subtract(1, "month").format('M');

        const currentMonthEarnings = earnings.filter((ride: any) => moment(ride.createdAt).format('M') === currentMonth);
        const lastMonthEarnings = earnings.filter((ride: any) => moment(ride.createdAt).format('M') === lastMonth);

        const percent = `${Math.round((currentMonthEarnings.reduce((a: any, b: any) => a + b.price, 0) / earnings.reduce((a: any, b: any) => a + b.price, 0)) * 100)}%` || "0%";
        const status = currentMonthEarnings.reduce((a: any, b: any) => a + b.price, 0) > lastMonthEarnings.reduce((a: any, b: any) => a + b.price, 0) ? "increase" : "decrease";

        return {percent, status};
    }

    //TODO: Rating and earnings statistics are to be added
    return [
        {
            title: "მგზავრობა",
            value: rides.length,
            compare: {
                percent: compareLastMonthRides(rides).status === "increase" ? `+${compareLastMonthRides(rides).percent}` : `-${compareLastMonthRides(rides).percent}` ? `0%` : `0%`,
                status: compareLastMonthRides(rides).status
            }
        },
        {
            title: "შემოსავალი",
            value: `${earnings.reduce((a, b) => a + b.price, 0).toFixed(2)} ₾`,
            compare: {
                percent: compareLastMonthEarnings(earnings).status === "increase" ? `+${compareLastMonthEarnings(earnings).percent}` : `-${compareLastMonthEarnings(earnings).percent}` ? parseFloat(compareLastMonthEarnings(earnings).percent) > 0 ? `-${compareLastMonthEarnings(earnings).percent}` : `0%` : `0%`,
                status: compareLastMonthEarnings(earnings).status
            }
        },
        {
            title: "ავტომობილები",
            value: cars
        },
        {
            title: "რეიტინგი",
            value: 4.5
        }
    ];
}