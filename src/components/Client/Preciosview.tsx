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
    params: { lin: any, prec: any };
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
                const response = await axios.get(`/api/precios/${params.prec}`);
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                router.push(`/client/${params.lin}/precios`);
            }
        };
        fetchData();
    }, [params.prec, params.lin, router]);    
    useEffect(() => {
        if (data._id && params.prec != data._id) {
            router.push(`/client/${params.lin}/precios`);
        }
    }, [data, params.prec, params.lin, router]);

  

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
