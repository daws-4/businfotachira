"use client";
import React from "react";
import CardDataStats from "@/components/CardDataStats";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";

const Client = (linea:any) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [data, setData] = useState<any>();
    const [localidades, setLocalidades] = useState<string[]>([]);

    console.log(localidades)
    useEffect(() => {
        const getData = async () => {
            try {
                const parsedData = JSON.parse(linea.linea);
                if (Array.isArray(parsedData)) {
                    setData(parsedData);
                } else {
                    throw new Error("Datos de línea no válidos");
                }
            } catch (error) {
                toast.error("Error al obtener los datos");
            }
        };
        getData();
    }, [linea]);

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            const localidadesTemp = data.map((item: any) => {
               if(item.localidad == 0){
                return "San Cristóbal";
               }else if (item.localidad == 1){
                return "Cárdenas";
               } else if (item.localidad == 2) {
                   return 'Torbes'
               } else if (item.localidad == 3) {
                   return 'Guásimos'
               } else if (item.localidad == 4) {
                   return 'Andrés Bello'
               }else{
                return 'San Cristóbal'
               }
               return ""; // Add this line to handle undefined values
            });
            setLocalidades(localidadesTemp.filter(Boolean)); // Filter out empty strings and undefined values
        }
    }, [data]);
    return (
        <>
            <div className="grid grid-cols-1">
                {data ? data.map((item: any, index: number) => (
                    <div className="p-5" key={item._id}>
                    <CardDataStats
                        url={`/client/${item.username}`}
                        id={item._id}
                        title={item.nombre}
                        text={item.username}
                        rate={localidades[index]}
                    />
                        </div>
                )) : 'Cargando...'}
            </div>
        </>
    );
};
export default Client;

