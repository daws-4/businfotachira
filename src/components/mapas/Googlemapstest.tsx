'use client'
import React from 'react';
import { GoogleMap, Polyline, PinElement, Marker, AdvancedMarker, CustomMarker, MarkerClusterer, InfoWindow} from 'react-google-map-wrapper';
import { useState } from 'react';

function Content() {
    return (
        <div id='content'>
            <div id='siteNotice'></div>
            <h1 id='firstHeading' className='firstHeading'>Uluru</h1>
            <div id='bodyContent'>
                ola k ase
            </div>
        </div>
    );
}

const GoogleMapComponent = () =>  {
    const flightPlanCoordinates = [
        { lat: 7.750193080189558, lng:- 72.23624527421724},
        { lat: 7.75101829780861, lng: - 72.23596632444897},
        { lat: 7.752793639673618, lng:- 72.23604679070637 },
        { lat: 7.760968620214217, lng: - 72.23439991440321 },
    ];
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(!isOpen);

    const uluru = { lat: 7.770234, lng: -72.218765 };
    const handleMarkerDragEnd = (Event:any) => {
            console.log(Event.position.lat)
            console.log(Event.position.lng)

      
    };

    return (
        <GoogleMap className='h-[400px]'
            containerProps={{ id: 'my-map' }} 
            zoom={14} mapOptions={{ mapId:'3fb624fb355015ed'}}
            center={{ lat: 7.770603, lng: -72.21868 }}>
            <MarkerClusterer>
            <InfoWindow ariaLabel='Uluru' content={<Content />} onCloseClick={() => setOpen(false)} open={isOpen}>
                <Marker {...uluru} title='Uluru (Ayers Rock)' onClick={handleOpen} />
            </InfoWindow> 
                <InfoWindow ariaLabel='Uluru' content={<Content />} onCloseClick={() => setOpen(false)} open={isOpen}>
                    <Marker lat={7.730603} lng={-72.29868} title='Uluru (Ayers Rock)' onClick={handleOpen} />
                </InfoWindow> 
                </MarkerClusterer>       
            <InfoWindow ariaLabel='plaza lo mango' content={<Content />} onCloseClick={() => setOpen(false)} open={isOpen}>
                <AdvancedMarker onClick={() => setOpen(true)} onDragEnd={handleMarkerDragEnd} gmpDraggable lat={7.770603} lng={-72.21868}>
                    <PinElement background='#FBBC04' scale={0.8} />
                </AdvancedMarker >
            </InfoWindow>
                <AdvancedMarker onDragEnd={handleMarkerDragEnd} gmpDraggable lat={7.770603} lng={-72.21000}>
                    <PinElement borderColor={'#137333'} />
                </AdvancedMarker> 
            <Polyline
                path={flightPlanCoordinates}
                strokeColor="#FF0000"
                strokeOpacity={1.0}
                strokeWeight={2}
                geodesic
            />
        </GoogleMap>
    );
}

export default GoogleMapComponent;
        