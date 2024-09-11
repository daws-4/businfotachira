'use client'
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 7.77060,
    lng: -72.21868
};

const GoogleMapComponent = () => {
    return (
        <LoadScript googleMapsApiKey = {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;