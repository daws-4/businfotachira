"use client";
import React from "react";
import CardData from "../CardData";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CarteleraProps {
    params: { lin: any, cart: any };
    post: any;
}
const Post: React.FC<CarteleraProps> = ({ params, post }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [data, setData] = useState<any>([]);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
      console.log(JSON.parse(post))
      try {
          setData(JSON.parse(post));
      } catch (error) {
        console.log(error)
      }
        };
        fetchData();
    }, [params.cart, params.lin, router, post]);
    useEffect(() => {
        if (data.id && params.cart != data._id) {
            router.push(`/client/${params.lin}`);
        }
    }, [data, params.cart, params.lin, router]);
    const date = new Date(data.createdAt);
    const formattedDate = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    return (
        <>
            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark grid grid-cols-1 place-items-center">
                    <h2 className="font-bold text-2xl text-black dark:text-white">
                        {data ? data.titulo : "Cargando..."}
                    </h2>
                    <h2 className='font-light text-slate-700 text-justify'>
                        {data ? data.texto : "Cargando..."}
                    </h2>
                </div>
            </div>
        </>
    );
};
export default Post;
//<CardData
//                     username={data.linea}
//                     id={data._id}
//                     text={data.texto}
//                     title={data.titulo}
//                     rate={formattedDate}
//                     levelUp={data.levelUp}
//                 >
//                 </CardData>