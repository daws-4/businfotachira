import React, { useState, useEffect } from "react";
import {
    GoogleMap,
    Polyline,
    AdvancedMarker,
} from "react-google-map-wrapper";
import axios from 'axios'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
interface PolilyneMapProps {
    onChangePolilyne: (data: any[]) => void;
    params: { linea: any, pd: any };

}

const PolilyneMap: React.FC<PolilyneMapProps> = ({ onChangePolilyne, params }) => {
    const param = params


    const [markers, setMarkers] = useState<any>([]);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const fetchdata = async () =>{

            const response = await axios.get(`/api/mapas/${param.pd}`);
            setMarkers(response.data.polilyne)
        }
        fetchdata();
    }, [param.pd]);
    const handleMarkerClick = (Event: any) => {
        const lt = Event.position.lat;
        const lg = Event.position.lng;
        const uid = lt + lg;
        setMarkers(markers.filter((marker: any) => marker.id != uid));
        onChangePolilyne(markers.filter((marker: any) => marker.id != uid));
    };

    const handleButton = () => {
        { setVisible(!visible) }
    }
    return (
        <>
            <Breadcrumb params={param} pageName="Recorrido" />
            <GoogleMap className="h-[500px]"
                initialZoom={14}
                initialCenter={{ lat: 7.770603, lng: -72.21868 }}
                mapOptions={{
                    mapId: "efcd50ac9512e064",
                }}
                style={{
                    height: "420px",
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
                    onChangePolilyne(markers.concat(newMarker));
                }}
            >
                {markers.map(({ lat, lng }: { lat: number, lng: number }, i: any) => (
                    <AdvancedMarker key={i} lat={lat} lng={lng} hidden={visible} onClick={handleMarkerClick} />
                ))}
                <Polyline
                    path={markers}
                    strokeColor="#FF0000"
                    strokeOpacity={1.0}
                    strokeWeight={2}
                    geodesic
                />
            </GoogleMap>
            <button className="mt-5 mx-5 rounded bg-blue-700 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={handleButton} >{visible? 'Mostrar Marcadores': 'Ocultar Marcadores'} </button>
        </>
    );
}

export default PolilyneMap;