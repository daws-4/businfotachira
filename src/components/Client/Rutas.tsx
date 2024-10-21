"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CarteleraProps {
  params: { lin: any };
  rutas : any
}

const Rutas: React.FC<CarteleraProps> = ({ params, rutas }) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(JSON.parse(rutas));
      setData(JSON.parse(rutas));
  };
   fetchData();
}, [params.lin, rutas]);
  return (
    <>
      <div className="pb-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
       {data.map((item: any, index:any) => {
          let localidad = 'San Cristóbal';
          if (item.localidad === 1) {
            localidad = 'San Cristóbal - Cárdenas';
          }else if(item.localidad === 2){
            localidad = 'San Cristóbal - Torbes';
          }else if (item.localidad === 3){
            localidad = 'San Cristóbal - Guásimos';
          }else if (item.localidad === 4){
            localidad = 'San Cristóbal - Andrés Bello';
          }
          const urlCard = `/client/${params.lin}/rutas/${item._id}`;
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
          
    </>
  );
};

export default Rutas;

