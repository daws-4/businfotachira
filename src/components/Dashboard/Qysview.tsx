"use client";
import React from "react";
import CardData from "../CardData";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CarteleraProps {
    params: { linea: any, ques: any };
}

const Qysview: React.FC<CarteleraProps> = ({ params }) => {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [data, setData] = useState<any>([]);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/qys/${params.ques}`);
                setData(response.data);
                setTitle(response.data.titulo);
                setText(response.data.texto);
            } catch (error) {
                router.push(`/dashboard/${params.linea}`);
            }
        };
        fetchData();
    }, [params.ques, params.linea, router]);
    useEffect(() => {
        if (data.id && params.ques != data._id) {
            router.push(`/dashboard/${params.linea}`);
        }
    }, [data, params.ques, params.linea, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        console.log(e.target.value);
    }


    const handleDelete = async (_id: string) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro que deseas ELIMINAR este contrato?"
        );
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/posts/${_id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {

                    toast.success("Publicación eliminada correctamente.");
                    router.push(`/dashboard/${params.linea}`);
                } else {
                    toast.error("Error al eliminar la publicación.");
                }
            } catch (error) {
                console.log(error);
                toast.error("Error al eliminar la publicación.");
            }
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const uploadData = await axios.put(`/api/posts/${params.ques}`, {
                titulo: title,
                texto: text,
                linea: params.linea,
            })
            window.location.reload();
            toast.success("Publicación Actualizada con éxito!");
        } catch (error) {
            console.log(error);
            toast.error("Error al subir la publicación.");
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
    //    const truncatedText = data.texto.length > 100 ? data.texto.substring(0, 100) + '...' : data.texto;
    //falta mapear 
    return (
        <>
            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <CardData
                    username={data.linea}
                    id={data._id}
                    text={data.mensaje}
                    title={data.alias}
                    subtitle2={'Número de Cédula: ' +data.cedula_identidad}
                    subtitle={data.email}
                    rate={formattedDate}
                    levelUp={data.levelUp}
                >
                </CardData>

            </div>
        </>
    );
};

export default Qysview;
