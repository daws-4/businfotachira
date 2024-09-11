'use client'
import React from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const origin = {
    lat: 7.757897172628224,
    lng: -72.2408196156254
};
const destination = {
    lat: 7.76773904752931,
    lng: -72.21847652125265
};

const GoogleMapRouteComponent = () => {
    const [directions, setDirections] = React.useState(null);
    const [travelTime, setTravelTime] = React.useState(null);

    const directionsCallback = (response:any) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setDirections(response);
                const route = response.routes[0].legs[0];
                setTravelTime(route.duration.text);
            } else {
                console.error('Directions request failed due to ' + response.status);
            }
        }
    };
    const DRIVING = 'DRIVING';

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={origin}
                zoom={13}
                options={{
                    draggable: true, // Permite arrastrar el mapa
                    zoomControl: true, // Muestra los controles de zoom
                    scrollwheel: true, // Permite el zoom con la rueda del ratón
                    disableDoubleClickZoom: false, // Permite el zoom con doble clic
                    gestureHandling: 'auto', // Asegura que los gestos de usuario están habilitados
                }}
            >
                <Marker position={origin} />
                <Marker position={destination} />
                <DirectionsService
                    options={{
                        destination: destination,
                        origin: origin,
                        travelMode: 'DRIVING'
                    }}
                    callback={directionsCallback}
                />
                {directions && (
                    <DirectionsRenderer
                        options={{
                            directions: directions
                        }}
                    />
                )}
            </GoogleMap>
            {travelTime && <p>Estimated travel time: {travelTime}</p>}
        </LoadScript>
    );
};

export default GoogleMapRouteComponent;