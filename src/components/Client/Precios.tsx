"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CarteleraProps {
    params: { lin: any };
}

const Precios: React.FC<CarteleraProps> = ({ params }) => {
    const [showAll, setShowAll] = useState<{ [key: string]: boolean }>({});
    const [data, setData] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/precios`);
            setData(response.data.filter((item: any) => item.linea === params.lin));
        };
        fetchData();
    }, [params.lin]);
    const handleShowAll = (distancia: string) => {
        setShowAll(prevState => ({
            ...prevState,
            [distancia]: !prevState[distancia]
        }));
    };
    const renderPriceSection = (title: string, dist: any[], showAll: boolean, handleShowAll: () => void) => {
        return (
            <>
                <div className="mb-5 mt-10 sm:w-1/3 w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h4 onClick={handleShowAll} className="cursor-pointer text-title-md font-bold text-black dark:text-white">
                            {title}
                        </h4>
                    </div>
                </div>
                <div className="pb-10 grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                    {dist.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, showAll ? dist.length : 1)
                        .map((item: any, index: any) => {
                            let distLabel = 'Dentro del municipio';
                            if (item.distancia == '1') {
                                distLabel = 'Un municipio';
                            } else if (item.distancia == '2') {
                                distLabel = 'Dos municipios';
                            } else if (item.distancia == '3') {
                                distLabel = 'Tres municipios';
                            } else if (item.distancia == '4') {
                                distLabel = 'Cuatro municipios';
                            }
                            const urlCard = `/client/${params.lin}/precios/${item._id}`;
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
                                    text={`Distancia: ${distLabel}`}
                                    title={`Precio BS: ${item.Monto_BSD}`}
                                    rate={`Fecha: ${formattedDate}`}
                                    subtitle={`Precio COP: ${item.Monto_COP}`}
                                    subtitle2={`Precio USD: ${item.Monto_USD}`}
                                    levelUp={item.levelUp}
                                />
                            );
                        })}
                </div>
            </>
        );
    };

    const groupByDistance = (data: any[]) => {
        return data.reduce((acc, item) => {
            const key = item.distancia;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {} as { [key: string]: any[] });
    };


    const groupedData = groupByDistance(data);
    return (
        <>
            <div className="flex justify-center w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className=" text-center border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                      Historial de Precios
                    </h4>
                </div>
            </div>
            {Object.keys(groupedData).map(distancia => (
                renderPriceSection(
                    `Precios ${distancia === '0' ? 'Dentro del Municipio' : `Fuera del Municipio (${distancia})`}`,
                    groupedData[distancia],
                    showAll[distancia] || false,
                    () => handleShowAll(distancia)
                )
            ))}

        </>
    );
};

export default Precios;
