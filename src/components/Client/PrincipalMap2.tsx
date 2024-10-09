'use client'
import React, { useEffect } from 'react';
import { useMapContext,Control, GoogleMap, Polyline, PinElement, AdvancedMarker, CustomMarker, MarkerClusterer, InfoWindow } from 'react-google-map-wrapper';
import { useState } from 'react';
import axios from 'axios';
import Breadcrumb from "@/components/Client/Breadcrumb";
import Image from 'next/image';
import { ObjectId, Schema } from 'mongoose';
interface PrincipalMap2Props {
    params: { lin: any, ruts: any, };
    id?:any
    todayData?:any
}
interface Marker {
    lat: number;
    lng: number;
    _id: string;
    nombre?: string;
    horaCercana?: string;
}

const PrincipalMap2: React.FC<PrincipalMap2Props> = ({ params, id, todayData }) => {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [poslat, setPoslat] = useState(7.760603);
    const [poslng, setPoslng] = useState(-72.22868);
    const [posvis   , setPosvis] = useState(true);
    const [center, setCenter] = useState({ lat: 7.770603, lng: -72.21868 })
    const [markers, setMarkers] = useState<any>([{
        id:- 64.44807700000001,lat:7.770603,lng:- 72.21868, _id:'66e8dfffddfb586a58aeb29f'
    }]);
    const [markersConHoras, setMarkersConHoras] = useState<Marker[]>([]);
    const [polilyne, setPolilyne] = useState<any>([]);
    const [data, setData] = useState<any>([]);
    const [fechas, setFechas] = useState<any>([]);
    const param = params

    useEffect(() => {
        navigator.geolocation.watchPosition(
            (position: GeolocationPosition) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setPoslat(pos.lat)
                setPoslng(pos.lng)
                setPosvis(false)
            }
        );
    },[]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`/api/mapa/${params.ruts}`);
                const filteredData = response.data.filter((item: any) => item._id == id);
                setData(filteredData);
                if(id){
                setPolilyne(filteredData[0].polilyne)
                setMarkers(filteredData[0].pdr)
            }
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [id , params.ruts]);

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
    useEffect(() => {
        setFechas(todayData)
        console.log(todayData)
    },[fechas, todayData])
    // Función para encontrar la próxima hora más cercana a la hora actual para cada punto de referencia
    const getHoraMasCercana = (horarios: any[], pdr_id: string) => {
        const now = new Date();
        const horaActual = now.getHours() * 60 + now.getMinutes(); // Convertir hora actual a minutos
        const horasPdr = horarios.filter(horario => horario.pdr_id === pdr_id);
        let horaMasCercana = null;
        let diferenciaMinima = Infinity;

        horasPdr.forEach(horario => {
            const [horas, minutos] = horario.hora.split(':').map(Number);
            const horaHorario = horas * 60 + minutos; // Convertir hora del horario a minutos

            const diferencia = horaHorario - horaActual;

            if (diferencia >= 0 && diferencia < diferenciaMinima) {
                diferenciaMinima = diferencia;
                horaMasCercana = horario.hora;
            }
        });

        return horaMasCercana;
    };

    useEffect(() => {
        const calcularHorasCercanas = () => {
            const nuevosMarkersConHoras = markers.map((marker: Marker) => {
                const horaCercana = getHoraMasCercana(fechas, marker._id);
                return { ...marker, horaCercana };
            });
            setMarkersConHoras(nuevosMarkersConHoras);
        };

        calcularHorasCercanas();
    }, [fechas, markers]);
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
                    height: "600px",
                }}
            >
                {markersConHoras.map(({ lat, lng, nombre, _id, horaCercana }, i) => (
                    <InfoWindow key={i} content={<div id='content'>
                        <div id='siteNotice'></div>
                        <h1 id='firstHeading' className='firstHeading font-medium text-black'>{nombre}</h1>
                        <div id='bodyContent'>
                            <h5 onClick={handleMarkerClick} className='cursor-pointer'>
                                {horaCercana ? `La próxima unidad pasa a las ${horaCercana}` : 'No hay unidades próximas'}
                                <br />
                                Presiona para abrir en google maps
                            </h5>
                        </div>
                    </div>} onCloseClick={handleClose}
                        open={isOpen === i}>
                        <AdvancedMarker onClick={() => handleOpen(i)} key={i} lat={lat} lng={lng} />
                    </InfoWindow>
                ))}
                <AdvancedMarker lat={poslat} lng={poslng} hidden={posvis}>
                    <Image key={'xd'} width={32} height={32} alt={`Location Marker`} src={`/icons/gps_fixed_24dp_0000F5.png`}></Image>
                </AdvancedMarker>
                <Polyline 
                    key={'polilyne'}
                    path={polilyne}
                    strokeColor="#FF0000"
                    strokeOpacity={1.0}
                    strokeWeight={2}
                    geodesic
                />

            </GoogleMap>
            {/* <button className='mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-2 py-4 text-center font-medium text-white hover:bg-opacity-90 ' onClick={testFunction}>Actualizar Ubicación</button> */}
        </>
    );
}

export default PrincipalMap2;
