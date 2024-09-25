"use client";
import React, { useEffect, useState } from "react";
import PrincipalMapp from "@/components/mapas/PrincipalMapp";
import { GoogleMapApiLoader } from 'react-google-map-wrapper';
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SelectRecorridos from "@/components/SelectGroup/SelectRecorridos";

interface CarteleraProps {
    params: { linea: any, p: any };
    mapa: any;
}

const PdrHorarioEdit: React.FC<CarteleraProps> = ({ params, mapa }) => {
    const [timeValues, setTimeValues] = useState<{ [key: string]: string }>({});
    const [timeObjects, setTimeObjects] = useState<{ pdr_id: string, hora: string, array_id: number }[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedHor4weeks, setPaginatedHor4weeks] = useState<any[]>([]);
    const param = params;
    const data = JSON.parse(mapa);
    const recorrido = data.recorrido;
    const hor4weeks = data.hor4weeks;

    const router = useRouter();

    useEffect(() => {
        const pageSize = hor4weeks.length;
        const totalPages = Math.ceil(hor4weeks.length / pageSize);
        const paginatedArray = [];
        for (let i = 0; i < totalPages; i++) {
            paginatedArray.push(hor4weeks.slice(i * pageSize, (i + 1) * pageSize));
        }
        setPaginatedHor4weeks(paginatedArray);
    }, [hor4weeks]);

    const handleTimeChange = (pdr_name: string, pdr_id: string, array_id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const hora = event.target.value;
        setTimeValues(prevState => ({
            ...prevState,
            [pdr_id]: hora
        }));

        setTimeObjects(prevState => {
            const newTimeObject = { pdr_id, hora, pdr_name, array_id };
            const existingIndex = prevState.findIndex((obj: { pdr_id: string }) => obj.pdr_id === pdr_id);
            if (existingIndex >= 0) {
                const updatedState = [...prevState];
                updatedState[existingIndex] = newTimeObject;
                return updatedState;
            } else {
                return [...prevState, newTimeObject];
            }
        });
    };

    useEffect(() => {
        setPaginatedHor4weeks(prevState => {
            const updatedState = [...prevState];
            if (currentPage - 1 >= 0 && currentPage - 1 < updatedState.length) {
                updatedState[currentPage - 1] = { ...updatedState[currentPage - 1], defaultHora: timeObjects };
            }
            return updatedState;
        });
    }, [timeObjects, currentPage]);

    const clearInputs = () => {
        setTimeValues({});
    };

    const handleNextPage = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeObjects([]);
        clearInputs();
        if (currentPage < paginatedHor4weeks.length) {
            setCurrentPage(currentPage + 1);
        } else {
            handleUpload();
        }
    };

    const handleUpload = async () => {
        const confirm = window.confirm("En caso de tener horarios ya creados estos se eliminarán, ¿Actualizar los horarios?");
        if (confirm) {
            try {
                const response0 = await axios.delete(`/api/horarios/${data._id}`);
                const response = await axios.post(`/api/horarios/${data._id}`, {
                    hor4weeks: paginatedHor4weeks.flat()
                });

                if (response.status === 200) {
                    toast.success("Horarios asignados correctamente.");
                    router.push(`/dashboard/${params.linea}/pdr/${params.p}`);
                } else {
                    toast.error("Error al asignar los horarios.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error al asignar los horarios.");
            }
        } else {
            clearInputs();
            setCurrentPage(1);
        }
    };

    return (
        <>
            <div className="w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <GoogleMapApiLoader v="beta" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                    <PrincipalMapp params={param} recorrido={recorrido} />
                </GoogleMapApiLoader>
            </div>

            <form onSubmit={handleNextPage}>
                {Array.isArray(paginatedHor4weeks[currentPage - 1]) && paginatedHor4weeks[currentPage - 1]?.map((cr: any, crIndex: number) => (
                    <div key={crIndex} className='grid grid-cols-1 md:grid-cols-2 gap-9'>
                        {cr.defaultHora.map((pdr: any) => (
                            <div key={pdr.pdr_id} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        Hora del {pdr.pdr_name} del recorrido {crIndex + 1}
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5.5 p-6.5">
                                    <input
                                        required
                                        value={timeValues[pdr.pdr_id] || pdr.hora}
                                        onChange={handleTimeChange(pdr.pdr_name, pdr.pdr_id, crIndex)}
                                        type="time"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

                <div className="flex justify-center mt-4">
                    {Array.from({ length: paginatedHor4weeks.length }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-primary text-white' : 'bg-gray-200'}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        type="submit"
                        className="mx-1 px-3 py-1 rounded bg-gray-200"
                        disabled={currentPage === paginatedHor4weeks.length}
                    >
                        {currentPage === paginatedHor4weeks.length ? 'Submit' : 'Siguiente'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default PdrHorarioEdit;