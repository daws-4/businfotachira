'use client'
import React, { useEffect } from 'react';
import { GoogleMap, Polyline, PinElement, Marker, AdvancedMarker, CustomMarker, MarkerClusterer, InfoWindow } from 'react-google-map-wrapper';
import { useState } from 'react';
import axios from 'axios';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
interface PrincipalMappProps {
    params: { linea: any, p: any, };
    recorrido : string;
}
const PrincipalMapp: React.FC<PrincipalMappProps> = ({ params, recorrido }) => {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [markers, setMarkers] = useState<any>([]);
    const [polilyne, setPolilyne] = useState<any>([]);
    const param = params
    useEffect(() => {
        const fetchdata = async () => {

            const response = await axios.get(`/api/mapas/${recorrido}`);
            setPolilyne(response.data.polilyne)
            setMarkers(response.data.pdr)
        }
        fetchdata();
    }, [recorrido]);

    const [isOpen, setOpen] = useState<number | null>(null);
    const handleOpen = ( i: number) => {
        setOpen(i);
        setLat(markers[i].lat)
        setLng(markers[i].lng)
    }
    const handleClose = () => {
        setOpen(null);
    };
    const handleMarkerClick = () => {
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    };

    return (
        <>
            <Breadcrumb params={param} pageName="Mapa" />
            <GoogleMap className='h-[400px]'
                initialZoom={14}
                initialCenter={{ lat: 7.770603, lng: -72.21868 }}
                mapOptions={{
                    mapId: "efcd50ac9512e064",
                }}
                style={{
                    height: "400px",
                }}
            >
                {markers && markers.map(({ lat, lng, nombre }: { lat: number, lng: number, nombre:string }, i: any) => (
                    <InfoWindow key={i} content={<div id='content'>
                        <div id='siteNotice'></div>
                        <h1 id='firstHeading' className='firstHeading font-medium text-black'>{nombre}</h1>
                        <div id='bodyContent'>
                            <h5 onClick={handleMarkerClick} className='cursor-pointer'>
                                Abrir Ubicación en Google Maps
                            </h5>
                        </div>
                    </div>} onCloseClick={handleClose}
                        open={isOpen === i}>
                        <AdvancedMarker onClick={() => handleOpen(i)} key={i} lat={lat} lng={lng} />
                    </InfoWindow>
                ))}
                <Polyline
                    key={'polilyne'}
                    path={polilyne}
                    strokeColor="#FF0000"
                    strokeOpacity={1.0}
                    strokeWeight={2}
                    geodesic
                />
            </GoogleMap>
        </>
    );
}

export default PrincipalMapp;
