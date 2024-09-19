"use client";
import React from "react";
import PrincipalMap from "@/components/mapas/PrincipalMap";
import { GoogleMapApiLoader } from 'react-google-map-wrapper'
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SelectRecorridos from "@/components/SelectGroup/SelectRecorridos";
interface CarteleraProps {
    params: { linea: any, pd: any };
    mapa: any;
}

const PdrHorario: React.FC<CarteleraProps> = ({ params, mapa}) => {
    const [timeValues, setTimeValues] = useState<{ [key: number]: string }>({});
    const [timeObjects, setTimeObjects] = useState<{ pdr_id: string, hora: string }[]>([]);
    const [cRecorridos, setCRecorridos] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [crArray, setCrArray] = useState<any>([]);
    const [paginatedCrArray, setPaginatedCrArray] = useState<any>([]);
    const param = params
    const data = JSON.parse(mapa)
    const pdr = data.pdr
    const router = useRouter();
    useEffect(() => {
        const pageSize = pdr.length; // Tamaño de la página basado en la longitud de data.pdr
        const totalPages = Math.ceil(crArray.length / pageSize);
        const paginatedArray = [];
        for (let i = 0; i < totalPages; i++) {
            paginatedArray.push(crArray.slice(i * pageSize, (i + 1) * pageSize));
        }
        setPaginatedCrArray(paginatedArray);
    }, [crArray, pdr.length]);

    useEffect(() => {
        if (data._id && params.pd != data._id) {
            router.push(`/dashboard/${params.linea}/pdr`);
        }
    }, [data, params.pd, params.linea, router]);
    const date = new Date(data.createdAt);
    const formattedDate = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    //    const truncatedText = data.texto.length > 100 ? data.texto.substring(0, 100) + '...' : data.texto;
    const handleTimeChange = (pdr_name:string ,pdr_id: string, array_id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const hora = event.target.value;
        setTimeValues(prevState => ({
            ...prevState,
            [pdr_id]: hora
        }));
        setTimeObjects(prevState => {
            const newTimeObject = { pdr_id, hora, pdr_name };
            const existingIndex = prevState.findIndex((obj: { pdr_id: string }) => obj.pdr_id === pdr_id);
            if (existingIndex >= 0) {
                const updatedState = [...prevState];
                updatedState[existingIndex] = newTimeObject;
                console.log('Updated timeObjects:', updatedState);
                return updatedState;
            } else {
                const newState = [...prevState, newTimeObject];
                console.log('Updated timeObjects:', newState);
                return newState;
            }
        });
        setCrArray((prevState: any) => {
            const updatedState = [...prevState];
            if (array_id >= 0 && array_id < updatedState.length) {
                updatedState[array_id] = { ...updatedState[array_id], defaultHora: timeObjects };
            }
            console.log('Updated crArray:', updatedState);
            return updatedState;
        });
    };
    const clearInputs = () => {
        setTimeValues({});
    };
    const handleRecorridosChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        clearInputs();
        const value = parseInt(e.target.value, 10);
        setCRecorridos(value);
        const newCrArray = Array.from({ length: value }, (_, index) => ({ nombre: `defaultHora ${index + 1}` , index: index }));
        setCrArray(newCrArray);
        console.log('Updated crArray:', newCrArray);
    }; 

    const handlePageChange = (page: number) => {
        clearInputs();
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        clearInputs();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        clearInputs();
        if (currentPage < cRecorridos) {
            setCurrentPage(currentPage + 1);
        }
    };
    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(cRecorridos, startPage + 7) ;
    return (
        <>
            <div className=" w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <GoogleMapApiLoader v="beta" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                    <PrincipalMap params={param} />
                </GoogleMapApiLoader>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mb-4">
               <SelectRecorridos onChange={handleRecorridosChange}/>
            </div>
            {crArray.slice(currentPage-1, currentPage).map((cr: any) => (
                <div key={cr.nombre} className='grid  grid-cols-1 md:grid-cols-2 gap-9'>
                    {pdr.map((pdr: any) => (
                        <div key={pdr._id} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Hora del {pdr.nombre} del recorrido {cr.index+1}
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">

                                <input
                                    required
                                    value={timeValues[pdr._id] || ''}
                                    onChange={handleTimeChange(pdr.nombre, pdr._id, cr.index)}
                                    type="time"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    className="mx-1 px-3 py-1 rounded bg-gray-200"
                    disabled={currentPage == 1}
                    hidden={currentPage == 1}
                >
                    Anterior
                </button>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={handleNextPage}
                    className="mx-1 px-3 py-1 rounded bg-gray-200"
                    disabled={currentPage == cRecorridos}
                    hidden={currentPage == cRecorridos}
                >
                    Siguiente
                </button>
            </div>
        </>
    );
};

export default PdrHorario;
