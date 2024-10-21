'use client'
import React, {useEffect} from 'react';
import { GoogleMap, Polyline, PinElement, Marker, AdvancedMarker, CustomMarker, MarkerClusterer, InfoWindow } from 'react-google-map-wrapper';
import { useState, useCallback } from 'react';
import axios from 'axios';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
interface PdrMapProps {
    onChangePdr: (data: any[]) => void;
    params: { linea: any, pd: any };

}
const PdrMap: React.FC<PdrMapProps> = ({ onChangePdr, params }) => {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [markers, setMarkers] = useState<any>([]);
    const [polilyne, setPolilyne] = useState<any>([]);
    const param = params

    const memoizedOnChangePdr = useCallback(onChangePdr, [onChangePdr]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/mapas/${param.pd}`);
                setPolilyne(response.data.polilyne);
                setMarkers(response.data.pdr);
                memoizedOnChangePdr(response.data.pdr);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (param.pd) {
            fetchData();
        }
    }, [param.pd, memoizedOnChangePdr]);

    const handleMarkerClick = () => {
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    };


    const handleMarkerClick2 = (Event: any) => {
        const lt = Event.position.lat;
        const lg = Event.position.lng;
        const uid = lt + lg;
        setMarkers(markers.filter((marker: any) => marker.id != uid));
        onChangePdr(markers.filter((marker: any) => marker.id != uid));}
        

    const Content = () => {
        return (
            <div id='content'>
                <div id='siteNotice'></div>
                <h1 id='firstHeading' className='firstHeading'>Marker</h1>
                <div id='bodyContent'>
                    <h5 onClick={handleMarkerClick} className='cursor-pointer'>
                        Abrir Ubicación en Google Maps
                    </h5>
                </div>
            </div>
        );
    }

    return (
        <> 
        <Breadcrumb params={param} pageName="Puntos de Referencia" />
        <GoogleMap className='h-[400px]'
            initialZoom={14}
            initialCenter={{ lat: 7.770603, lng: -72.21868 }}
            mapOptions={{
                mapId: "efcd50ac9512e064",
            }}
            style={{
                height: "400px",
            }}
            onClick={(_, Event) => {
                let { latLng } = Event;

                if (!latLng) {
                    return;
                }
                const lt = latLng.lat();
                const lg = latLng.lng();
                const id = lg + lt
                const newMarker = {
                    lat: lt,
                    lng: lg,
                    id: id,
                };

                setMarkers((p: any) => p.concat(newMarker));
                onChangePdr(markers.concat(newMarker));
            }}
        >
            {markers.map(({ lat, lng }: { lat: number, lng: number }, i: any) => (
                <InfoWindow key={i} content={<Content />} >
                    <AdvancedMarker key={i} lat={lat} lng={lng} onClick={handleMarkerClick2} />
                </InfoWindow>
            ))}
            <Polyline
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

export default PdrMap;
