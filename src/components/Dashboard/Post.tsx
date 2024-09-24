"use client";
import React from "react";
import CardData from "../CardData";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CarteleraProps {
    params: { linea: any, poste: any };
}

const Post: React.FC<CarteleraProps> = ({ params }) => {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [data, setData] = useState<any>([]);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/posts/${params.poste}`);
                setData(response.data);
                setTitle(response.data.titulo);
                setText(response.data.texto);
            } catch (error) {
                router.push(`/dashboard/${params.linea}`);
            }
        };
        fetchData();
    }, [params.poste, params.linea, router]);
    useEffect(() => {
        if (data.id && params.poste != data._id) {
            router.push(`/dashboard/${params.linea}`);
        }
    }, [data, params.poste, params.linea, router]);

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

            const uploadData = await axios.put(`/api/posts/${params.poste}`, {
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
                    text={data.texto}
                    title={data.titulo}
                    rate={formattedDate}
                    levelUp={data.levelUp}
                >
                    <button
                        onClick={() => handleDelete(data._id)}
                        className="inline-flex items-center justify-center rounded-full bg-red px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Eliminar
                    </button>
                </CardData>

            </div>

            <div className=" w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Editar Publicación
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="pb-10">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Editar Título
                                </label>
                                <input

                                    value={title}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Editar Título"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Editar Texto
                            </label>
                            <textarea
                                rows={6}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Editar Texto"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-full bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                                Actualizar Publicación
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
