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

const Pdr: React.FC<CarteleraProps> = ({ params }) => {
    const [data, setData] = useState<any>([]);
    const [rutas, setRutas] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/mapas`);
            setData(response.data.filter((item: any) => item.linea === params.linea));
            const resp = await axios.get(`/api/rutas`);
            setRutas(resp.data.filter((item:any) => item.linea===params.linea)   );
        };
        fetchData();
    }, [params.linea]);
    return (
        <>
            <div className="pb-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                {data.map((item: any, index: any) => {
                   const rut = rutas.find((ruta:any)=>ruta._id===item.ruta)
                    let localidad = 'San Cristóbal';
                    let nombre = ''
                    if (rut) {
                    nombre = rut.nombre;
                    if (rut.localidad === 1) {
                        localidad = 'San Cristóbal - Cárdenas';
                    } else if (rut.localidad === 2) {
                        localidad = 'San Cristóbal - Torbes';
                    } else if (rut.localidad === 3) {
                        localidad = 'San Cristóbal - Guásimos';
                    } else if (rut.localidad === 4) {
                        localidad = 'San Cristóbal - Andrés Bello';
                    }
                    }
                    const urlCard = `/dashboard/${params.linea}/pdr/${item._id}`;
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
                            text={nombre}
                            title={item.nombre}
                            subtitle={localidad}
                            levelUp={item.levelUp}
                        />
                    );
                })}
            </div>
            <div className=" sm:w-1/4 w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <Link href={`/dashboard/${params.linea}/pdr/post`} className="inline-flex items-center justify-center rounded-full bg-blue-700 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Añadir parte del recorrido</Link>
                </div>
            </div>

        </>
    );
};

export default Pdr;

