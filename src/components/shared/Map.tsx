import React, {useMemo, useCallback, useRef, useEffect} from 'react';
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from '@react-google-maps/api';
import locationImg from "@/assets/location.gif";

type LatLngLiteral = google.maps.LatLngLiteral;
// type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

// const defaultMapOptions = {
//     strokeOpacity: 0.5,
//     strokeWeight: 2,
//     clickable: false,
//     editable: false,
//     draggable: false,
//     visible: true,
// }

// const closeOptions = {
//     ...defaultMapOptions,
//     zIndex: 3,
//     fillOpacity: 0.3,
//     strokeColor: '#8BC34A',
//     fillColor: '#8BC34A',
// }
//
// const middleOptions = {
//     ...defaultMapOptions,
//     zIndex: 2,
//     fillOpacity: 0.3,
//     strokeColor: '#FBC02D',
//     fillColor: '#FBC02D',
// }
//
// const farOptions = {
//     ...defaultMapOptions,
//     zIndex: 1,
//     fillOpacity: 0.3,
//     strokeColor: '#FF5252',
//     fillColor: '#FF5252',
// }

const Map = ({directionResponse}: {
    directionResponse: any
}) => {

    const mapRef = useRef<GoogleMap>();

    const center = useMemo<LatLngLiteral>(() => (
        {
            lat: 41.6938,
            lng: 44.8015
        }
    ), []);
    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        clickableIcons: false,
    }), []);

    const onMapLoad = useCallback((map: any) => (mapRef.current = map), []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            center.lat = pos.lat;
            center.lng = pos.lng;

            mapRef.current?.panTo(pos);
        });
    }, [center])

    return (
        <>
            <GoogleMap
                center={center}
                zoom={12}
                mapContainerStyle={{
                    width: '100%',
                    height: '100%'
                }}
                options={options}
                onLoad={onMapLoad}
            >
                <Marker position={center} icon={
                    {
                        url: locationImg.src,
                        scaledSize: new google.maps.Size(50, 50)
                    }
                } visible={!directionResponse}/>
                {directionResponse && <DirectionsRenderer directions={directionResponse} options={
                    {
                        suppressMarkers: false,
                        markerOptions: {
                            icon: {
                                url: locationImg.src,
                                scaledSize: new google.maps.Size(50, 50)
                            }
                        },
                        polylineOptions: {
                            strokeColor: "#e84e3e",
                            strokeOpacity: 0.8,
                            strokeWeight: 10,
                        }
                    }
                }/>}
            </GoogleMap>
        </>
    );
};

export default Map;
