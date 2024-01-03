import React from 'react';
import {cn} from "@/lib/utils";

interface IIconProps {
    className?: string;
}

const CarSeatIcon = ({className}: IIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 75" version="1.1"
             x="0px" y="0px" className={cn(className)}>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-1085.000000, -443.000000)" fill="currentColor">
                    <g transform="translate(1085.000000, 443.000000)">
                        <path
                            d="M40.9023,49.8101 L38.2703,58.0001 L32.3083,58.0001 L32.7873,56.2461 C32.7993,56.1981 32.7883,56.1501 32.7943,56.1021 L34.2493,50.5551 C34.2503,50.5531 34.2493,50.5521 34.2493,50.5501 L34.8173,48.3841 C35.0373,47.5981 35.5783,46.8921 36.3013,46.4481 C37.0283,46.0021 37.8393,45.8721 38.5863,46.0801 C38.7793,46.1341 38.9643,46.2081 39.1403,46.2961 C39.2993,46.3761 39.4533,46.4711 39.5993,46.5781 C39.6073,46.5831 39.6153,46.5871 39.6233,46.5921 C39.9363,46.8261 40.2153,47.1201 40.4433,47.4611 C40.4633,47.4901 40.4893,47.5101 40.5103,47.5361 C40.9433,48.2261 41.1133,49.0501 40.9023,49.8101 L40.9023,49.8101 Z M3.4353,54.1491 L30.5273,56.8581 L30.2283,58.0001 L4.7173,58.0001 L3.4353,54.1491 Z M47.9993,12.2241 L47.9993,10.8441 C49.3193,10.4361 49.9993,9.1591 49.9993,7.0001 C49.9993,2.9011 49.8553,0.0001 47.9993,0.0001 C44.2573,0.0001 42.9993,4.8071 42.9993,7.0001 C42.9993,7.8981 43.0093,10.4531 45.9993,10.9191 L45.9993,12.0941 C43.6133,12.5311 42.1533,14.5591 40.7643,17.4411 C40.5043,17.9841 39.8433,18.9571 39.0073,20.1891 C35.0203,26.0651 26.7243,38.2931 31.4643,48.7061 C31.4913,48.7651 31.5183,48.8341 31.5473,48.9021 C24.6703,47.4211 11.9603,44.7731 6.3523,44.1881 C3.7573,43.9191 1.9183,44.4611 0.8813,45.8051 C-0.9107,48.1301 0.5213,51.9181 0.9923,53.1631 L1.0493,53.3151 L1.0493,53.3161 L3.0483,59.3161 C3.1843,59.7251 3.5663,60.0001 3.9973,60.0001 L30.9993,60.0001 L38.9993,60.0001 C39.4333,60.0001 39.8183,59.7201 39.9513,59.3061 L42.8173,50.3841 C43.1663,49.1331 42.9493,47.8331 42.3413,46.7291 L48.9643,17.8471 C49.1223,17.2671 49.8543,14.2991 48.7343,12.8321 C48.5313,12.5661 48.2833,12.3641 47.9993,12.2241 L47.9993,12.2241 Z"/>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default CarSeatIcon;
