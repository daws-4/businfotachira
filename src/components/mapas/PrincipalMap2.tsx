'use client'
import React, { useEffect } from 'react';
import { useMapContext,Control, GoogleMap, Polyline, PinElement, Marker, AdvancedMarker, CustomMarker, MarkerClusterer, InfoWindow } from 'react-google-map-wrapper';
import { useState } from 'react';
import axios from 'axios';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
interface PrincipalMap2Props {
    params: { linea: any, taru: any, };
    id?:any

}
const MapContent = () => {
    const map = useMapContext();

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.setCenter(pos)
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    return (
        <Control position={google.maps.ControlPosition.TOP_CENTER}>
            <button onClick={handleLocation}>Center Map</button>
        </Control>
    );
}

const PrincipalMap2: React.FC<PrincipalMap2Props> = ({ params, id }) => {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [center, setCenter] = useState({ lat: 7.770603, lng: -72.21868 })
    const [markers, setMarkers] = useState<any>([{
        id:- 64.44807700000001,lat:7.770603,lng:- 72.21868, _id:'66e8dfffddfb586a58aeb29f'
    }]);
    const [polilyne, setPolilyne] = useState<any>([]);
    const [data, setData] = useState<any>([]);
    const param = params
    useEffect(() => {
        const fetchdata = async () => {
            console.log(id)
            try {
                const response = await axios.get(`/api/mapa/${params.taru}`);
                const filteredData = response.data.filter((item: any) => item._id == id);
                console.log(filteredData)
                console.log(response.data)
                setData(filteredData);
                if(id){
                setPolilyne(filteredData[0].polilyne)
                console.log(filteredData[0].polilyne)
                setMarkers(filteredData[0].pdr)}
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [id]);

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
            <Breadcrumb params={param} pageName="Mapas" />

            <GoogleMap className='h-[400px]'
                initialZoom={14}
                initialCenter={center}
                mapOptions={{
                    mapId: "efcd50ac9512e064",
                }}
                style={{
                    height: "400px",
                }}
            >
                {markers.map(({ lat, lng, nombre }: { lat: number, lng: number, nombre:string }, i: any) => (
                    <InfoWindow content={<div id='content'>
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
                    path={polilyne}
                    strokeColor="#FF0000"
                    strokeOpacity={1.0}
                    strokeWeight={2}
                    geodesic
                />

                <MapContent />
            </GoogleMap>
        </>
    );
}

export default PrincipalMap2;
