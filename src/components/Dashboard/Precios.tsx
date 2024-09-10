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

const Precios: React.FC<CarteleraProps> = ({ params }) => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/precios`);
            setData(response.data.filter((item: any) => item.linea === params.linea));
        };
        fetchData();
    }, []);
    return (
        <>
            <div className=" w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                      Historial de Precios
                    </h4>
                </div>
            </div>
            <div className="py-10 grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                {data.map((item: any, index: any) => {
                    const urlCard = `/dashboard/${params.linea}/precios/${item._id}`;
                    const date = new Date(item.createdAt);
                    const formattedDate = date.toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    });
                    return (
                        <CardDataStats
                            url={urlCard}
                            key={index}
                            text={`Pecio USD: ${item.Monto_USD}`}
                            title={`Precio BS: ${item.Monto_BSD}`}
                            rate={`Fecha: ${formattedDate}`}
                            subtitle={`Precio COP: ${item.Monto_COP}`}
                            levelUp={item.levelUp}
                        />
                    );
                })}
            </div>
            <div className=" w-64 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <Link href={`/dashboard/${params.linea}/precios/post`} className="inline-flex items-center justify-center rounded-full bg-blue-700 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-8">Actualizar Precio</Link>
                </div>
            </div>

        </>
    );
};

export default Precios;
