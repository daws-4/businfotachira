"use client";
import React from "react";
import PolilyneMap from "@/components/mapas/PolilyneMap";
import { GoogleMapApiLoader } from 'react-google-map-wrapper'
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface CarteleraProps {
    params: { linea: any, pd: any };
}

const PdrPolilyne: React.FC<CarteleraProps> = ({ params }) => {
    const param = params

    const [nombre, setNombre] = useState("");
    const [data, setData] = useState<any>([]);
    const [ruta, setRuta] = useState<any>();
    const [sector, setSector] = useState("San Cristóbal");
    const [pdr, setPdr] = useState<any>([]);
    const [polilyne, setPolilyne] = useState<any>([]);
    const router = useRouter();

    const handlePolilyneChange = (data: any[]) => {
        setPolilyne(data)
        console.log(data)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/mapas/${params.pd}`);
                setData(response.data);
                setNombre(response.data.nombre);
                setRuta(response.data.ruta);
                setPdr(response.data.pdr);
                if (response.data.ruta === 1) {
                    setSector('San Cristóbal - Cárdenas');
                } else if (response.data.ruta === 2) {
                    setSector('San Cristóbal - Torbes');
                } else if (response.data.ruta === 3) {
                    setSector('San Cristóbal - Guásimos');
                } else if (response.data.ruta === 4) {
                    setSector('San Cristóbal - Andrés Bello');
                }
            } catch (error) {
                router.push(`/dashboard/${params.linea}/pdr`);
            }
        };
        fetchData();
    }, [params.pd, params.linea, router]);
    useEffect(() => {
        if (data._id && params.pd != data._id) {
            router.push(`/dashboard/${params.linea}/pdr`);
        }
    }, [data, params.pd, params.linea, router]);


    const date = new Date(data.createdAt);
    const formattedDate = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    //    const truncatedText = data.texto.length > 100 ? data.texto.substring(0, 100) + '...' : data.texto;
    const handlePolilyneButton = async () => {
        try {
            const response = await axios.put(`/api/mapas/${params.pd}`, {
                polilyne: polilyne
            });
            toast.success("Recorrido guardado con éxito.");
            router.push(`/dashboard/${params.linea}/pdr/${params.pd}`);
        } catch (error) {
            toast.error("Error al guardar el recorrido.");
            console.log(error);
        }
    }
    return (
        <>
            <div className=" w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <GoogleMapApiLoader v="beta" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                    <PolilyneMap params={param} onChangePolilyne={handlePolilyneChange} />
                </GoogleMapApiLoader>
                <button
                    onClick={handlePolilyneButton}
                    className="mt-5 mx-5 rounded bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Guardar Recorrido
                </button>
            </div>
        </>
    );
};

export default PdrPolilyne;
