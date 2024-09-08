"use client";
import dynamic from "next/dynamic";
import React from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CarteleraProps {
  params: { linea: any };
}

const Rutas: React.FC<CarteleraProps> = ({ params }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
    const response = await axios.get(`/api/rutas`);
    setData(response.data);
  };
   fetchData();
}, []);
  return (
    <>
      <div className="pb-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
       {data.map((item: any, index:any) => {
          let localidad = 'San Cristóbal';
          if (item.localidad === 1) {
            localidad = 'San Cristóbal - Cárdenas';
          }else if(item.localidad === 2){
            localidad = 'San Cristóbal - Torbes';
          }
          const urlCard = `/dashboard/${params.linea}/rutas/${item._id}`;
          const date = new Date(item.createdAt);
          const formattedDate = date.toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
      });
       const truncatedText = item.descripcion.length > 100 ? item.descripcion.substring(0, 100) + '...' : item.descripcion;
  return (
    <CardDataStats
      url={urlCard}
      key={index}
      text={truncatedText}
      title={item.nombre}
      subtitle={localidad}
      levelUp={item.levelUp}
    />
  );
})}
      </div>
       <div className=" w-56 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <Link href={`/dashboard/${params.linea}/rutas/post`} className="inline-flex items-center justify-center rounded-full bg-blue-700 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Crear Ruta</Link>
            </div>  
          </div>
          
    </>
  );
};

export default Rutas;

