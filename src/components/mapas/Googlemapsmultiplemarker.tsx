'use client'
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const centre = {
    lat: 7.77060,
    lng: -72.21868
};

const locations = [
    {
        lat: 7.757897172628224,
        lng: -72.2408196156254 },
    {
        lat: 7.76773904752931,
        lng: -72.21847652125265 },
    // Add more locations here
];

const MultipleMarkersMap = () => {
    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={centre}
                zoom={10}
            >
                {locations.map((location, index) => (
                    <Marker key={index} position={location} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default MultipleMarkersMap;