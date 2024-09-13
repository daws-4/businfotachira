import { Suspense, useState } from "react";
import {
    GoogleMapApiLoader,
    GoogleMap,
    Polyline,
    Marker,
} from "react-google-map-wrapper";

const Map = () => {
    const [markers, setMarkers] = useState<any>([
        { lat: 7.770603, lng: -72.21868, id: -64.44807700000001 },
    ]);
    const [visible, setVisible] = useState(true);


    const handleMarkerClick = (Event:any) => {
        console.log(markers)
        const lt = Event.position.lat();
        const lg = Event.position.lng();
        const uid = lt+lg;
        setMarkers(markers.filter((marker:any) => marker.id != uid));
    };

    const handleButton = () => {
        {setVisible(!visible)}
    }
    return (
        <>
        <GoogleMap className="h-[400px]"
            initialZoom={14}
            initialCenter={{ lat: 7.770603, lng: -72.21868}}
            mapOptions={{
                mapId: "efcd50ac9512e064",
            }}
            style={{
                height: "400px",
            }}
            onClick={(_, Event) => {
                console.log(Event)
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
                setMarkers((p:any) => p.concat(newMarker));
                console.log(markers)
            }}
        >
            {markers.map(({ lat, lng }: { lat: number, lng: number }, i:any) => (
                <Marker key={i} lat={lat} lng={lng} visible={visible} onClick={handleMarkerClick} />
            ))}
            <Polyline
                path={markers}
                strokeColor="#FF0000"
                strokeOpacity={1.0}
                strokeWeight={2}
                geodesic
            />
        </GoogleMap>
        <button onClick={handleButton} >cambio de estado</button>
        </>
    );
}

export default Map
 function App() {
    return (
        <Suspense fallback="loading google map api">
            <GoogleMapApiLoader
                apiKey="AIzaSyCLIlFswvMTqIA0RzXf6d9aFw4CIBRjrV4"
                suspense
            >
                <Map />
            </GoogleMapApiLoader>
        </Suspense>
    );
}

