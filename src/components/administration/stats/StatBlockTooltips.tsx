import React from "react";

const RidesTooltip = ({active, payload, external}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md rounded-md p-2">
                <p className="label">{`${payload[0].payload.name} : ${payload[0].payload.count}`}</p>
            </div>
        );
    }

    return null;
}

const UserTooltip = ({active, payload, external}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md rounded-md p-2">
                <p className="label font-bold">{`${payload[0].payload.name}`}</p>
                <p className="label">{`${payload[0].name} : ${payload[0].payload.count.male}`}</p>
                <p className="label">{`${payload[1].name} : ${payload[1].payload.count.female}`}</p>
            </div>
        );
    }

    return null;
}

const EarningTooltip = ({active, payload, external}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md rounded-md p-2">
                <p className="label">{`${payload[0].payload.name} : ${payload[0].payload.count}`}</p>
            </div>
        );
    }

    return null;
}

export {RidesTooltip, UserTooltip, EarningTooltip};