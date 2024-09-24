


"use client";
import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import CardData from "../CardData";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface CarteleraProps {
    params: { linea: any, prep: any };
}

const Preciosview: React.FC<CarteleraProps> = ({ params }) => {

    const [data, setData] = useState<any>([]);
    const [nombre, setNombre] = useState("");
    const [ci, setCi] = useState("");
    const [placa, setPlaca] = useState("");
    const [numero, setNumero] = useState("");

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/precios/${params.prep}`);
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                router.push(`/dashboard/${params.linea}/precios`);
            }
        };
        fetchData();
    }, [params.prep, params.linea, router]);    
    useEffect(() => {
        if (data._id && params.prep != data._id) {
            router.push(`/dashboard/${params.linea}/precios`);
        }
    }, [data, params.prep, params.linea, router]);

    const handleChangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
        console.log(e.target.value);
    }
    const handleChangeCi = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCi(e.target.value);
        console.log(e.target.value);
    }
    const handleChangePlaca = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaca(e.target.value);
        console.log(e.target.value);
    }
    const handleChangeNumero = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumero(e.target.value);
        console.log(e.target.value);
    }


    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro que deseas ELIMINAR esta precio?"
        );
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/prepdes/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {

                    toast.success("prepd eliminada correctamente.");
                    router.push(`/dashboard/${params.linea}/precios`);
                } else {
                    toast.error("Error al eliminar el precio.");
                }
            } catch (error) {
                console.log(error);
                toast.error("Error al eliminar el precio.");
            }
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const uploadData = await axios.put(`/api/precios/${params.prep}`, {
                nombre_conductor: nombre,
                ci_conductor: ci,
                numero: numero,
                placa: placa,
                linea: params.linea,
            })
            if (uploadData)
                router.push(`/dashboard/${params.linea}/precios`);
            toast.success("prepd Actualizada con éxito!");
        } catch (error) {
            console.log(error);
            toast.error("Error al  el precio.");
        }

    };

    const date = new Date(data.createdAt);
    const formattedDate = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    let dist = 'Dentro del municipio'
    if (data.distancia == '1') {
        dist = 'Un municipio'
    } else if (data.distancia == '2') {
        dist = 'Dos municipios'
    } else if (data.distancia == '3') {
        dist = 'Tres municipios'
    } else if (data.distancia == '4') {
        dist = 'Cuatro municipios'
    }
    return (
        <>
            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <CardData
                    username={data.nombre}
                    id={data._id}
                    text={`Distancia: ${dist}`}
                    title={`Precio BS: ${data.Monto_BSD}`}
                    rate={`${formattedDate}`}
                    subtitle={`Precio COP: ${data.Monto_COP}`}
                    subtitle2={`Precio USD: ${data.Monto_USD}`}
                    levelUp={data.levelUp}
                >
                   
                </CardData>
            </div>
        </>
    );
};

export default Preciosview;
