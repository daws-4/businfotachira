"use client";
import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import CardData from "../CardData";
import axios from "axios";
import SelectLocalidad from "@/components/SelectGroup/SelectLocalidad";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface CarteleraProps {
    params: { linea: any, taru: any };
}

const Rutasview: React.FC<CarteleraProps> = ({ params }) => {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [data, setData] = useState<any>([]);
    const [localidad, setLocalidad] = useState<number>();
    const [sector, setSector] = useState("San Cristóbal");

    const router = useRouter();
    const handleLocalidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "0") {
            setLocalidad(0);
            console.log(e.target.value);
        } else if (e.target.value === "1") {
            setLocalidad(1);
            console.log(e.target.value);
        } else if (e.target.value === "2") {
            setLocalidad(2);
            console.log(e.target.value);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/rutas/${params.taru}`);
                setData(response.data);
                setNombre(response.data.nombre);
                setDescripcion(response.data.descripcion);
                if (response.data.localidad === 1) {
                    setSector('San Cristóbal - Cárdenas');
                } else if (response.data.localidad === 2) {
                    setSector('San Cristóbal - Torbes');
                }else if (response.data.localidad === 3) {
                    setSector('San Cristóbal - Guásimos');
                }else if (response.data.localidad === 4) {
                    setSector('San Cristóbal - Andrés Bello');
                }
            } catch (error) {
                router.push(`/dashboard/${params.linea}/rutas`);
            }
        };
        fetchData();
    }, [params.taru]);
    useEffect(() => {
        if (data._id && params.taru != data._id) {
            router.push(`/dashboard/${params.linea}/rutas`);
        }
    }, [data, params.taru, params.linea, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
        console.log(e.target.value);
    }


    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro que deseas ELIMINAR esta ruta?"
        );
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/rutas/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {

                    toast.success("Ruta eliminada correctamente.");
                    router.push(`/dashboard/${params.linea}`);
                } else {
                    toast.error("Error al eliminar la Ruta.");
                }
            } catch (error) {
                console.log(error);
                toast.error("Error al eliminar la Ruta.");
            }
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const uploadData = await axios.put(`/api/rutas/${params.taru}`, {
                nombre: nombre,
                descripcion: descripcion,
                localidad: localidad,
                linea: params.linea,
            })
            window.location.reload();
            toast.success("Ruta Actualizada con éxito!");
        } catch (error) {
            console.log(error);
            toast.error("Error al subir la Ruta.");
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
    //falta mapear 
    return (
        <>
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
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Editar Nombre
                                </label>
                                <input

                                    value={nombre}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Editar Título"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <SelectLocalidad onChange={handleLocalidadChange} />
                            <label className=" pt-5 mb-3 block text-sm font-medium text-black dark:text-white">
                                Editar Descripcion
                            </label>

                            <textarea
                                rows={6}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Editar Texto"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-full bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                                Actualizar Ruta
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Rutasview;
