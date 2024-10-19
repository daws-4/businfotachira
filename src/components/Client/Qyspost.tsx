"use client";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";
import SelectLinea from "@/components/SelectGroup/SelectLinea";
import { useRouter } from "next/navigation";

const Qyspost = () => {
    const [nombre, setNombre] = useState("");
    const [c_identidad, setC_identidad] = useState("");
    const [email, setEmail] = useState("");
    const [destinatario, setDestinatario] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState<any>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/lineas`);
            setData(response.data);
        };
        fetchData();
    }, []);

    const handleForm = async (e: any) => {
        e.preventDefault();
        const confirmAdd = window.confirm(
            "¿Estás seguro que deseas ENVIAR un mesaje al buzón de quejas y sugerencias?"
        );
        if (confirmAdd) {
            try {
                const response = await axios.post("/api/qys", {
                    alias: nombre,
                    cedula_identidad: c_identidad,
                    email: email,
                    mensaje: description,
                    linea: destinatario,
                });
                console.log(response)
                toast.success("Ruta agregada exitosamente");
                router.push(`/client`);
            } catch (error) {
                console.log(error)
                toast.error("Error al enviar el mensaje");
            }
        }
    }

    const handleLocalidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDestinatario(e.target.value);
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <div className=" w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className=" justify-center border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Envía tu solicitud o sugerencia
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
                                        placeholder="Ingresa tu nombre"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full ">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Ingresa tu email"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full ">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Cédula de Identidad
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        step="1"
                                        onChange={(e) => setC_identidad(e.target.value)}
                                        placeholder="Ingresa tu cédula de identidad"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            <SelectLinea onChange={handleLocalidadChange} />

                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Mensaje
                                </label>
                                <textarea
                                    rows={6}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Escribe tu mensaje"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Enviar Mensaje
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Qyspost;

