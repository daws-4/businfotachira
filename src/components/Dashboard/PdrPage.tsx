"use client";
import React from "react";
import PdrMap from "@/components/mapas/PdrMap";
import { GoogleMapApiLoader } from 'react-google-map-wrapper'
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface CarteleraProps {
    params: { linea: any, pd: any };
}

const PdrPage: React.FC<CarteleraProps> = ({ params }) => {
    const param = params

    const [data, setData] = useState<any>([]);
    const [ruta, setRuta] = useState<any>();
    const [pdr, setPdr] = useState<any>([]);
    const [polilyne, setPolilyne] = useState<any>([]);
    const router = useRouter();
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/mapas/${params.pd}`);
                setData(response.data);
                
            } catch (error) {
                router.push(`/dashboard/${params.linea}/pdr`);
            }
        };

        if (params.pd && params.linea) {
            fetchData();
        }
    }, [params.pd, params.linea, router]);

    const handlePdrChange = (data: any[]) => {
        const updatedPdr = data.map((item: any, index: number) => ({
            ...item,
            nombre: `PDR ${index + 1}`,
        }));
        setPdr(updatedPdr)
        console.log(updatedPdr)
    }
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
    const handlePdrButton = async () => {
        
        const confirm = window.confirm("En caso de tener horarios ya creados estos se eliminarán, ¿Actualizar los PDR?");
        if (!confirm) return;
        try {

            const response0 = await axios.delete(`/api/horarios/${data._id}`);
            const response = await axios.put(`/api/mapas/${params.pd}`, {
                recorridos: [],
                pdr:pdr
            });
            if(pdr.length === 1){
                toast.success(`${pdr.length} PDR guardado correctamente.`);
            }else{
                toast.success(`${pdr.length} PDR guardados correctamente.`);
            }
            router.push(`/dashboard/${params.linea}/pdr/${params.pd}`);
        } catch (error) {
            toast.error("Error al guardar los PDR.");
            console.log(error);
        }
    }
    return (
        <>
            <div className=" w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <GoogleMapApiLoader v="beta" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                    <PdrMap params={param} onChangePdr={handlePdrChange} />
                </GoogleMapApiLoader>
                <button
                    onClick={handlePdrButton}
                    className="mt-5 mx-5 rounded bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Guardar PDR
                </button>
            </div>
        </>
    );
};

export default PdrPage;
