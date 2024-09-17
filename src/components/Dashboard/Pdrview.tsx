"use client";
import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import CardData from "../CardData";
import Map from "@/components/mapas/Googlemaptest2";
import PolilyneMap from "@/components/mapas/PolilyneMap";
import { GoogleMapApiLoader } from 'react-google-map-wrapper'
import axios from "axios";
import SelectRuta from "@/components/SelectGroup/SelectRuta";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "mongoose";


interface CarteleraProps {
    params: { linea: any, pd: any };
}

const Pdrview: React.FC<CarteleraProps> = ({ params }) => {
    const param = params

    const [nombre, setNombre] = useState("");
    const [data, setData] = useState<any>([]);
    const [ruta, setRuta] = useState<any>();
    const [sector, setSector] = useState("San Cristóbal");
    const [pdr, setPdr] = useState<any>([]);
    const [polilyne, setPolilyne] = useState<any>([]);
    const router = useRouter();
    const handleRutaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRuta(e.target.value)
        console.log(ruta)
    }; 
    const handlePdrChange = (data: string) => {
        setPdr(data)
        console.log(pdr)
    }
    const handlePolilyneChange = (data: any[]) => {
        setPolilyne(data)
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
    }, [params.pd]);
    useEffect(() => {
        if (data._id && params.pd != data._id) {
            router.push(`/dashboard/${params.linea}/pdr`);
        }
    }, [data, params.pd, params.linea, router]);
    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro que deseas ELIMINAR esta parte?"
        );
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/mapas/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {

                    toast.success("Parte eliminada correctamente.");
                    router.push(`/dashboard/${params.linea}/pdr`);
                } else {
                    toast.error("Error al eliminar la parte.");
                }
            } catch (error) {
                console.log(error);
                toast.error("Error al eliminar la parte.");
            }
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const uploadData = await axios.put(`/api/pdr/${params.pd}`, {
                nombre: nombre,
                ruta: ruta,
                linea: params.linea,
            })
            window.location.reload();
            toast.success("Parte Actualizada con éxito!");
        } catch (error) {
            console.log(error);
            toast.error("Error al subir la Parte.");
        }

    };

    const date = new Date(data.createdAt);
    const formattedDate = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    //    const truncatedText = data.texto.length > 100 ? data.texto.substring(0, 100) + '...' : data.texto;
    const handlePolilyneButton = () => {
        
    }
    return (
        <>
            <div className=" w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <GoogleMapApiLoader v="beta" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                    <PolilyneMap params={param} onChangePolilyne={handlePolilyneChange} />
                </GoogleMapApiLoader>
                <button
                    onClick={() => handlePolilyneButton}
                    className="mt-5 mx-5 rounded bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Guardar Recorrido
                </button>
            </div>


            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <CardData
                    username={data.nombre}
                    id={data._id}
                    text={data.descripcion}
                    subtitle={sector}
                    title={data.nombre}
                    rate={formattedDate}
                    levelUp={data.levelUp}
                >
                    <button
                        onClick={() => handleDelete(data._id)}
                        className="inline-flex items-center justify-center rounded-full bg-red px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Eliminar
                    </button>
                </CardData>

            </div>

            <div className="  sm:w-1/2  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Editar Ruta
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="pb-10">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full ">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Nombre
                                        </label>
                                        <input
                                        value={nombre}
                                            type="text"
                                            required
                                            onChange={(e) => setNombre(e.target.value)}
                                            placeholder="Ingresa el nombre de la nueva parte del recorrido"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <SelectRuta params={param} onChange={handleRutaChange} />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-full bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                                Actualizar parte de la ruta 
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pdrview;
