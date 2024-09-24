"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CarteleraProps {
    params: { linea: any };
}

const Unidades: React.FC<CarteleraProps> = ({ params }) => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/unidades`);
            setData(response.data.filter((item: any) => item.linea === params.linea));
        };
        fetchData();
    }, [params.linea]);
    return (
        <>
            <div className="pb-10 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                {data.map((item: any, index: any) => {
                    const urlCard = `/dashboard/${params.linea}/unidades/${item.placa}`;
                    const date = new Date(item.createdAt);
                    
                    return (
                        <CardDataStats
                            url={urlCard}
                            key={index}
                            text={`Placa: ${item.placa}`}
                            title={`Unidad: ${item.numero}`}
                            subtitle={`Conductor: ${item.nombre_conductor}`}
                            levelUp={item.levelUp}
                        />
                    );
                })}
            </div>
            <div className=" w-60 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <Link href={`/dashboard/${params.linea}/unidades/post`} className="inline-flex items-center justify-center rounded-full bg-blue-700 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-8">Añadir Unidad</Link>
                </div>
            </div>

        </>
    );
};

export default Unidades;
