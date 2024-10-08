"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
import { useEffect, useState } from "react";

interface CarteleraProps {
  params: { lin: any };
  posts: any;
}
const Cartelera: React.FC<CarteleraProps> = ({ params, posts }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState<[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log(JSON.parse(posts))
      try {
          setData(JSON.parse(posts));
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [posts]);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sortedData = data.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark grid grid-cols-1 place-items-center">
          <h2 className="font-bold text-black dark:text-white">
            Línea Intercomunal
          </h2>
          <h2 className='font-light text-slate-700'>
           Publicaciones
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5">
        {currentItems.map((item: any, index: any) => {
          const urlCard = `/client/${params.lin}/cartelera/${item._id}`;
          const date = new Date(item.createdAt);
          const formattedDate = date.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          const truncatedText = item.texto.length > 100 ? item.texto.substring(0, 100) + '...' : item.texto;
          return (
            <CardDataStats
              url={urlCard}
              username={item.linea}
              key={index}
              id={item._id}
              text={truncatedText}
              title={item.titulo}
              rate={formattedDate}
              levelUp={item.levelUp}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Cartelera;

