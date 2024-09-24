"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface CarteleraProps {
  params: { linea: any };
}

const Cartelera: React.FC<CarteleraProps> = ({ params }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/posts`)
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
      <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Subir Pubicación
          </h3>
        </div>

        <div className="p-4 md:p-6 xl:p-9">
          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
            <form onSubmit={handleSubmit}>
              <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
                <div className="w-full">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Título
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Texto
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1"
                    rows={5}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Subir Publicación
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5">
        {currentItems.map((item: any, index: any) => {
          const urlCard = `/dashboard/${params.linea}/posts/${item._id}`;
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

