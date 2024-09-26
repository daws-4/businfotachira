'use client'
import React, { useEffect, useState, useRef } from "react";
import PrincipalMapp from "@/components/mapas/PrincipalMapp";
import { GoogleMapApiLoader } from 'react-google-map-wrapper';
import { useRouter } from "next/navigation";
import SelectUnidad from "@/components/SelectGroup/SelectUnidad";

interface CarteleraProps {
    params: { linea: any, p: any };
    mapa: any;
}

interface DefaultHora {
    unidad: string;
    pdr_name: string;
    array_id: number;
    pdr_id: string;
    hora: string;
    fecha: string;
}

interface Hor {
    index: number;
    nombre: string;
    defaultHora: DefaultHora[];
}

interface Horarios {
    linea: string;
    ruta: string;
    recorrido: string;
    fecha: string;
    hor4weeks: Hor[];
}

const PdrHorarioEdit: React.FC<CarteleraProps> = ({ params, mapa }) => {
    const [timeValues, setTimeValues] = useState<{ [pdr_id: string]: string }[]>([]);
    const [unitValues, setUnitValues] = useState<{ [pdr_id: string]: string }[]>([]);
    const param = params;
    const data: Horarios = JSON.parse(mapa);
    const recorrido = data.recorrido;
    const hor4weeks = data.hor4weeks;

    const router = useRouter();
    const prevHor4weeksRef = useRef<Hor[] | null>(null);

    useEffect(() => {
        const test1 = hor4weeks.flatMap((hor) => {hor.index});
        console.log(test1)
        console.log(hor4weeks)
    }, [hor4weeks]);

    const updateTimeValue = (weekIndex: number, pdr_id: string, value: string) => {
        setTimeValues(prevState => {
            const newState = [...prevState];
            newState[weekIndex] = {
                ...newState[weekIndex],
                [pdr_id]: value
            };
            return newState;
        });
    };

    const updateUnitValue = (weekIndex: number, pdr_id: string, value: string) => {
        setUnitValues(prevState => {
            const newState = [...prevState];
            newState[weekIndex] = {
                ...newState[weekIndex],
                [pdr_id]: value
            };
            return newState;
        });
    };

    return (
        <>
            <div className="w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <GoogleMapApiLoader v="beta" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                    <PrincipalMapp params={param} recorrido={recorrido} />
                </GoogleMapApiLoader>
            </div>
            
            <form  className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                    <div  className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-4">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Recorrido
                            </h3>
                        </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <h3 className="font-medium text-black dark:text-white">
                                
                                </h3>
                                <input
                                    required
                                    type="time"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                    </div>
                <div className="col-span-2 flex justify-center mt-4">
                    <button
                        type="submit"
                        className="mx-1 px-3 py-1 rounded bg-gray-200"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default PdrHorarioEdit;