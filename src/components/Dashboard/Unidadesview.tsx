"use client";
import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import CardData from "../CardData";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface CarteleraProps {
    params: { linea: any, unida: any };
}

const Unidadesview: React.FC<CarteleraProps> = ({ params }) => {

    const [data, setData] = useState<any>([]);
    const [nombre, setNombre] = useState("");
    const [ci, setCi] = useState("");
    const [placa, setPlaca] = useState("");
    const [numero, setNumero] = useState("");

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/unidades/${params.unida}`);
                console.log(response.data);
                setData(response.data);
                setNombre(response.data.nombre_conductor);
                setCi(response.data.ci_conductor);
                setPlaca(response.data.placa);
                setNumero(response.data.numero);
            } catch (error) {
                router.push(`/dashboard/${params.linea}/unidades`);
            }
        };
        fetchData();
    }, [params.unida, params.linea, router]);
    useEffect(() => {
        if (data.placa && params.unida != data.placa) {
            router.push(`/dashboard/${params.linea}/unidades`);
        }
    }, [data, params.unida, params.linea, router]);

    const handleChangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
        console.log(e.target.value);
    }
    const handleChangeCi = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCi(e.target.value);
        console.log(e.target.value);
    }
    const handleChangePlaca = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaca(e.target.value);
        console.log(e.target.value);
    }
    const handleChangeNumero = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumero(e.target.value);
        console.log(e.target.value);
    }


    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro que deseas ELIMINAR esta Unidad?"
        );
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/unidades/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {

                    toast.success("Unidad eliminada correctamente.");
                    router.push(`/dashboard/${params.linea}/unidades`);
                } else {
                    toast.error("Error al eliminar la Unidad.");
                }
            } catch (error) {
                console.log(error);
                toast.error("Error al eliminar la Unidad.");
            }
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const uploadData = await axios.put(`/api/unidades/${params.unida}`, {
                nombre_conductor: nombre,
                ci_conductor: ci,
                numero: numero,
                placa: placa,
                linea: params.linea,
            })
            if (uploadData)
            router.push(`/dashboard/${params.linea}/unidades`);
            toast.success("Unidad Actualizada con éxito!");
        } catch (error) {
            console.log(error);
            toast.error("Error al subir la Unidad.");
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
                    text={`Código de Placa: ${data.placa}`}
                    subtitle={`Nombre del Conductor: ${data.nombre_conductor}`}
                    subtitle2={`Cédula de Identidad: ${data.ci_conductor}`}
                    title={`Número de Unidad: ${data.numero}`}
                    rate={formattedDate}
                    levelUp={data.levelUp}
                >
                    <button
                        onClick={() => handleDelete(data.placa)}
                        className="inline-flex items-center justify-center rounded-full bg-red px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Eliminar
                    </button>
                </CardData>
            </div>

            <div className=" sm:w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Editar Unidad
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="pb-3">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Editar Número de Unidad
                                </label>
                                <input

                                    value={numero}
                                    onChange={handleChangeNumero}
                                    type="text"
                                    placeholder="Editar Número de Unidad"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="pb-3">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Editar Nombre del Conductor
                                </label>
                                <input

                                    value={nombre}
                                    onChange={handleChangeNombre}
                                    type="text"
                                    placeholder="Editar Nombre del conductor"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="pb-3">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Editar Cédula de Identidad del Conductor
                                </label>
                                <input

                                    value={ci}
                                    onChange={handleChangeCi}
                                    type="text"
                                    placeholder="Editar cédula de identidad del conductor"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="pb-3">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Editar Código de Placa
                                </label>
                                <input

                                    value={placa}
                                    onChange={handleChangePlaca}
                                    type="text"
                                    placeholder="Editar código de placa"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-full bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                                Actualizar Unidad
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Unidadesview;
