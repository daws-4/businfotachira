"use client";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";
import SelectRuta from "@/components/SelectGroup/SelectRuta";
import { useRouter } from "next/navigation";

interface CarteleraProps {
    params: { linea: any };
}

const Pdrpost: React.FC<CarteleraProps> = ({ params }) => {
    const param=params
    const [nombre, setNombre] = useState("");
    const [ruta, setRuta] = useState("");
    const [data, setData] = useState<any>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/mapas`);
            setData(response.data.filter((item: any) => item.linea === params.linea));
        };
        fetchData();
    }, [params.linea]);
    const polilyne = [
        { id: -64.44807700000001, lat: 7.770603, lng: -72.21868 }]
    
    const handleForm = async (e: any) => {
        e.preventDefault();
        const confirmAdd = window.confirm(
            "¿Estás seguro que deseas AÑADIR una nueva parte del recorrido?"
        );
        if (confirmAdd) {
            try {
                const response = await axios.post("/api/mapas", {
                    nombre: nombre,
                    ruta: ruta,
                    linea: params.linea,
                    polilyne: polilyne,
                });
                console.log(response)
                toast.success("Parte del recorrido agregada exitosamente");
                router.push(`/dashboard/${params.linea}/pdr`);
            } catch (error) {
                console.log(error)
                toast.error("Error al agregar la parte");
            }
        }
    }

    const handleRutaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRuta(e.target.value);
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <div className=" w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className=" justify-center border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Ingresar nueva parte del recorrido
                        </h3>
                    </div>
                    <form onSubmit={handleForm}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full ">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Ingresa el nombre de la nueva parte del recorrido"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            <SelectRuta params={param} onChange={handleRutaChange} />

                            <button className=" flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Añadir parte del recorrido
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Pdrpost;

