"use client";
import React from "react";
import axios from "axios";
import CardDataStats from "@/components/CardDataStats";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";


const Admin = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("api/lineas");
            setData(response.data);
        };
        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <div className="grid grid-cols-3 sm:grid-cols-1 m-5 p-5">
                {data.map((item: any) => (
                    <div className="" key={item._id}>
                    <CardDataStats
                        url={`/dashboard/${item.username}`}
                        id={item._id}
                        title={item.nombre}
                        text={item.username}
                        rate={formatDate(item.createdAt)}
                    />
                    <div>
                    <button className=" my-2 ml-4 inline-flex items-center justify-center rounded bg-blue-800 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        <Link href={`/dashboard/${item.username}/ajustes`}>
                        Editar
                        </Link>
                    </button>
                    <button className="my-5 w-30 inline-flex items-center justify-center rounded-full bg-red px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        Eliminar
                    </button>
                        </div>
                        </div>
                ))}
                    <Link href={`/dashboard/add`}>
                    <button className=" my-2 ml-4 inline-flex items-center justify-center rounded bg-blue-800 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Añadir Nueva Línea
                    </button>
                    </Link>
                
            </div>
        </>
    );
};

export default Admin;

