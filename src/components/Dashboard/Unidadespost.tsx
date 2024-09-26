"use client";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";
import SelectLocalidad from "@/components/SelectGroup/SelectLocalidad";
import { useRouter } from "next/navigation";

interface CarteleraProps {
    params: { linea: any };
}

const Unidadespost: React.FC<CarteleraProps> = ({ params }) => {
    const [nombre, setNombre] = useState("");
    const [placa, setPlaca] = useState("");
    const [numero, setNumero] = useState("");
    const [ci, setCi] = useState("");
    const [data, setData] = useState<any>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/unidades`);
            setData(response.data);
        };
        fetchData();
    }, []);

    const handleForm = async (e: any) => {
        e.preventDefault();
        const confirmAdd = window.confirm(
            "¿Estás seguro que deseas AÑADIR una nueva unidad?"
        );
        if (confirmAdd) {
            try {
                const response = await axios.post("/api/unidades", {
                    nombre_conductor: nombre,
                    ci_conductor: ci,
                    numero: numero,
                    placa: placa,
                    linea: params.linea,
                });
                console.log(response)
                toast.success("Ruta agregada exitosamente");
                router.push(`/dashboard/${params.linea}/unidades`);
            } catch (error) {
                console.log(error)
                toast.error("Error al agregar la ruta");
            }
        }
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <div className=" w-2/3 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className=" justify-center border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Ingresar nueva Ruta
                        </h3>
                    </div>
                    <form onSubmit={handleForm}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full ">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Nombre del Conductor
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Ingresa el nombre del conductor"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div className="w-full ">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Cédula de Identidad del Conductor
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        onChange={(e) => setCi(e.target.value)}
                                        placeholder="Ingresa la cédula de identidad del conductor"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Placa de la Unidad
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={8}
                                    onChange={(e) => setPlaca(e.target.value)}
                                    placeholder="Ingresa la placa de la unidad"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Número de la Unidad
                                </label>
                                <input
                                    type="text"
                                    required
                                    onChange={(e) => setNumero(e.target.value)}
                                    placeholder="Ingresa Número de la unidad"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Añadir Unidad
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Unidadespost;

