"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface QysProps {
  params: { linea: any };
}

const Qys: React.FC<QysProps> = ({ params }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/qys`)
      setData(response.data.filter((item: any) => item.linea === params.linea));
    };
    fetchData();
  }, [params.linea]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const uploadData = await axios.post('/api/posts', {
        titulo: title,
        texto: text,
        linea: params.linea,
      })
        .then(function (response) {
          toast.success("Publicación subida con éxito!");
          window.location.reload();
        })
        .catch(function (error) {
          toast.error("Error al subir la publicación.");
          console.log(error);
        });
      setTitle('');
      setText('');
    } catch (error) {
      console.log(error);
      toast.error("Error al subir la publicación.");
    }

  };

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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5">
        {currentItems.map((item: any, index: any) => {
          const urlCard = `/dashboard/${params.linea}/qys/${item._id}`;
          const date = new Date(item.createdAt);
          const formattedDate = date.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          const truncatedText = item.mensaje.length > 100 ? item.mensaje.substring(0, 100) + '...' : item.texto;
          return (
            <CardDataStats
              url={urlCard}
              username={item.linea}
              key={index}
              id={item._id}
              text={truncatedText}
              title={item.alias}
              subtitle={item.email}
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

export default Qys;

