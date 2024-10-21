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
    const [timeObjects, setTimeObjects] = useState<{ pdr_id: string, hora: string, array_id:number}[]>([]);
    const [cRecorridos, setCRecorridos] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [crArray, setCrArray] = useState<any>([]);
    const [paginatedCrArray, setPaginatedCrArray] = useState<any>([]);
    const param = params
    const data = JSON.parse(mapa)
    const pdr = data.pdr
    const router = useRouter();
    useEffect(() => {
        const pageSize = pdr.length;
        if (!pageSize) {
            router.push(`/dashboard/${params.linea}/pdr/${params.pd}`);
        }
        const totalPages = Math.ceil(crArray.length / pageSize);
        const paginatedArray = [];
        for (let i = 0; i < totalPages; i++) {
            paginatedArray.push(crArray.slice(i * pageSize, (i + 1) * pageSize));
        }
        setPaginatedCrArray(paginatedArray);
    }, [crArray, pdr.length, params.linea, params.pd, router]);
    useEffect(() => {
        if (data._id && params.pd != data._id) {
            router.push(`/dashboard/${params.linea}/pdr/${params.pd}`);
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
        console.log(array_id)
        setTimeValues(prevState => ({
            ...prevState,
            [pdr_id]: hora
        }));

        setTimeObjects( prevState => {

            const newTimeObject = { pdr_id, hora, pdr_name, array_id };
            const existingIndex = prevState.findIndex((obj: { pdr_id: string }) => obj.pdr_id === pdr_id);
            if (existingIndex >= 0) {
                const updatedState = [...prevState];
                updatedState[existingIndex] = newTimeObject;
                return updatedState;
            } else {
                const newState = [...prevState, newTimeObject];
                return newState;
            }
        });
    };

    useEffect(() => {
        setCrArray((prevState: any) => {
            const updatedState = [...prevState];
            if (currentPage - 1 >= 0 && currentPage - 1 < updatedState.length) {
                updatedState[currentPage - 1] = { ...updatedState[currentPage - 1], defaultHora: timeObjects };
            }
            console.log('Updated crArray:', updatedState);
            return updatedState;
        });
    }, [timeObjects, currentPage]);
    const clearInputs = () => {
        setTimeValues({});
    };
    const handleRecorridosChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        clearInputs();
        setCurrentPage(1)
        const value = parseInt(e.target.value, 10);
        setCRecorridos(value);
        const newCrArray = Array.from({ length: value }, (_, index) => ({ nombre: `defaultHora ${index + 1}` , index: index }));
        setCrArray(newCrArray);
    };
    const handleNextPage = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeObjects([]);
        clearInputs();
        if (currentPage == cRecorridos){
            handleUpload();
        }
        if (currentPage < cRecorridos) {
            setCurrentPage(currentPage + 1);
        }
    };
    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(cRecorridos, startPage + 7) ;

    const handleUpload = async () => {
            const confirm = window.confirm("En caso de tener horarios ya creados estos se eliminarán, ¿Actualizar los horarios?");
            if (confirm) {
                const today = new Date();
                const generateDataArray = (startDate: Date, days: number) => {
                    const dataArray = [];
                    for (let i = 0; i < days; i++) {
                        const newDate = new Date(startDate);
                        newDate.setDate(startDate.getDate() + i);
                        const formattedDate = newDate.toLocaleString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        });

                        const hor4weeks = Array.isArray(crArray)
                            ? crArray.map((cr: any) => {
                                return {
                                    index: cr.index,
                                    nombre: cr.nombre,
                                    defaultHora: Array.isArray(cr.defaultHora)
                                        ? cr.defaultHora.map((hora: any) => ({
                                            ...hora,
                                            fecha: formattedDate, // Añadir la fecha correspondiente
                                        }))
                                        : [],
                                };
                            })
                            : [];

                        dataArray.push({
                            fecha: formattedDate,
                            hor4weeks,
                            linea: params.linea,
                            recorrido: params.pd,
                            ruta: data.ruta,
                        });
                    }
                    return dataArray;
                };

                const dataArray = generateDataArray(today, 28);
            console.log(dataArray);
            try {
                const response0 = await axios.delete(`/api/horarios/${data._id}`);
                const response = await axios.put(`/api/mapas/${params.pd}`, {
                    recorridos: crArray
                });
                dataArray.map(async (data: any) => {
                    console.log(data.hor4weeks)
                    const response1 = await axios.post(`/api/horarios/`, {

                        fecha: data.fecha,
                        hor4weeks: data.hor4weeks,
                        linea: data.linea,
                        ruta: data.ruta,
                        recorrido: data.recorrido,
                    })
                })

                if (response.status === 200) {
                    toast.success("Horarios asignados correctamente.");
                    router.push(`/dashboard/${params.linea}/pdr/${params.pd}`);
                } else {
                    toast.error("Error al asignar los horarios.");
                }
            } catch (error) {
                window.location.reload()
                // console.log(error);
                toast.error("Error al asignar los horarios.");
            }
        }else{

            clearInputs();
            setCurrentPage(1)
        }
    }

    return (
        <>
            <div className=" w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <GoogleMapApiLoader v="beta" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                    <PrincipalMap params={param} />
                </GoogleMapApiLoader>
            </div>
            
            <form onSubmit={handleNextPage} >
                <div className="grid sm:grid-cols-2 grid-cols-1 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mb-4">

                    <SelectRecorridos onChange={handleRecorridosChange} />
                    <div
                        hidden={currentPage != cRecorridos} className='sm:ml-5 sm:mt-5'>
                        <button
                            className="mt-4 ml-4 inline-flex items-center justify-center rounded bg-blue-800 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            Asignar Horario por Defecto
                        </button>
                    </div>
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
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
                        <div
                            key={page}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-primary text-white' : 'bg-gray-200'}`}
                        >
                            {page}
                        </div>
                    ))}
                    <button
                        className="mx-1 px-3 py-1 rounded bg-gray-200"
                        disabled={currentPage == cRecorridos}
                        hidden={currentPage == cRecorridos}
                    >
                        Siguiente
                    </button>
                </div>
            </form>
        </>
    );
};

export default PdrHorario;
