"use client";
import React from "react";
import CardDataStats from "@/components/CardDataStats";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";

const Linea = (linea: any) => {
    const [data, setData] = useState<any>();
    const [localidad, setLocalidad] = useState<string>("San Cristóbal");

    useEffect(() => {
        const getData = async () => {
            try {
            console.log(JSON.parse(linea.linea))
            setData(JSON.parse(linea.linea));
            } catch (error) {
                toast.error("Error al obtener los datos");
            }
        };
        getData();
    }, [linea]);

    useEffect(() => {
        if (data && data.localidad == 1) {
            setLocalidad("Cárdenas");
        }else if(data && data.localidad == 2){
            setLocalidad("Torbes");
        }else if (data && data.localidad == 3){
            setLocalidad("Guásimos")
        }else if (data && data.localidad == 4){
            setLocalidad ("Andrés Bello")
        }
    }, [data]);

    return (
        <>
            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark grid grid-cols-1 place-items-center">
                     <h2 className="font-bold text-black dark:text-white">
                     {data ? data.nombre : "Cargando..."}
                     </h2>
                     <h2 className='font-light text-slate-700'> 
                        {localidad}
                     </h2>
               </div>
                <div className="p-4 md:p-6 xl:p-9">
                    <div className="mb-7.5 grid grid-cols-1 place-items-center gap-5 xl:gap-20">
                        <h2 className="font-medium text-black dark:text-white">
                            
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Linea;

