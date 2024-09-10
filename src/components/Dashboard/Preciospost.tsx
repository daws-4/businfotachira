"use client";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";
import SelectDistancia from "@/components/SelectGroup/SelectDistancia";
import { useRouter } from "next/navigation";

interface CarteleraProps {
    params: { linea: any };
}

const Unidadespost: React.FC<CarteleraProps> = ({ params }) => {
    const [bs, setBs] = useState("");
    const [usd, setUsd] = useState("");
    const [cop, setCop] = useState("");
    const [distancia, setDistancia] = useState("");
    const [data, setData] = useState<any>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/precios`);
            setData(response.data);
        };
        fetchData();
    }, []);

    const handleForm = async (e: any) => {
        e.preventDefault();
        const confirmAdd = window.confirm(
            "¿Estás seguro que deseas AÑADIR un nuevo precio?"
        );
        if (confirmAdd) {
            try {
                const response = await axios.post("/api/precios", {
                    Monto_BSD: bs,
                    Monto_COP: cop,
                    Monto_USD: usd,
                    distancia: distancia,
                    linea: params.linea,
                });
                console.log(response)
                toast.success("Precio actualizado exitosamente");
                router.push(`/dashboard/${params.linea}/precios`);
            } catch (error) {
                console.log(error)
                toast.error("Error al actualizar el precio");
            }
        }
    }
    const handleDistanciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDistancia(e.target.value);
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <div className=" lg:w-1/3 w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className=" justify-center border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Ingresar Nuevo Precio
                        </h3>
                    </div>
                    <form onSubmit={handleForm}>
                        <div className="p-6.5">
                            <SelectDistancia onChange={handleDistanciaChange}/>
                            <div className="mb-4.5 flex flex-col gap-6 ">
                                <div className="w-full ">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Precio en Bs.
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        onChange={(e) => setBs(e.target.value)}
                                        placeholder="BSD"
                                        className=" w-full  rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div className="w-full ">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Precio en COP
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        onChange={(e) => setCop(e.target.value)}
                                        placeholder="COP"
                                        className="w-full  rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className=" justify-center mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Precio en USD
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    maxLength={8}
                                    onChange={(e) => setUsd(e.target.value)}
                                    placeholder="USD"
                                    className=" w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <button className=" w-full  justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Actualizar Precio
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Unidadespost;

// "mapa validation failed: ruta: Path `ruta` is required., url: Path `url` is required., id: Path `id` is required."