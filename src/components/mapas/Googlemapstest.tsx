'use client'
import React from 'react';
import { GoogleMap, GoogleMapApiLoader, Marker } from 'react-google-map-wrapper';
const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 7.77060,
    lng: -72.21868
};

const GoogleMapComponent = () =>  {

    return (
        <GoogleMap className='h-[400px]'
            containerProps={{ id: 'my-map' }} 
            zoom={14} 
            center={{ lat: 7.770603, lng: -72.21868 }}>
            <Marker lat={7.770603} lng={-72.21868} draggable/>
        </GoogleMap>
    );
}

export default GoogleMapComponent;