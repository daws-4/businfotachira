'use client'
import React, { useEffect, useState, useRef } from "react";
import PrincipalMapp from "@/components/mapas/PrincipalMapp";
import { GoogleMapApiLoader } from 'react-google-map-wrapper';
import { useRouter } from "next/navigation";
import SelectUnidad from "@/components/SelectGroup/SelectUnidad";
import { time } from "console";
import { set } from "mongoose";
import axios from "axios";
import { toast } from "react-toastify";

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
}[];

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

    const data = JSON.parse(mapa);
    const recorrido = data.recorrido;
    const hor4weeks = data.hor4weeks;
    const [timeValues, setTimeValues] = useState<any>(hor4weeks);
    const [unitValues, setUnitValues] = useState<{ [pdr_id: string]: string }[]>([]);
    const param = params;

    const router = useRouter();
    console.log(timeValues)
    useEffect(() => {
            console.log(timeValues)

    }, [hor4weeks, timeValues]);


    const updateTimeValue = (rIndex: number, pdrIndex: number, defaultHora: any, value: string) => {
        setTimeValues((prevState: any) => {

            const newState = [ ...prevState];

            if (!newState[rIndex]) {
                newState[rIndex] = {};
            }

            if (!newState[rIndex].defaultHora[pdrIndex]) {
                newState[rIndex].defaultHora[pdrIndex] = { ...defaultHora };
            }

            newState[rIndex].defaultHora[pdrIndex].hora = value;

            // // Convertir newState de un objeto a un arreglo
            // const newStateArray = Object.values(newState);  { [rIndex: number]: { [pdrIndex: string]: any} }

            console.log(newState)
            return newState;
        });
    };


    const updateUnitValue = (rIndex: number, pdrIndex: number, defaultHora: any, value: string) => {
        setTimeValues((prevState:any) => {

            const newState = [...prevState];

            if (!newState[rIndex]) {
                newState[rIndex] = {};
            }

            if (!newState[rIndex].defaultHora[pdrIndex]) {
                newState[rIndex].defaultHora[pdrIndex] = { ...defaultHora };
            }

            newState[rIndex].defaultHora[pdrIndex].unidad = value;

            // // Convertir newState de un objeto a un arreglo
            // const newStateArray = Object.values(newState);  { [rIndex: number]: { [pdrIndex: string]: any} }

            console.log(newState)
            return newState;
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const confirm = window.confirm("¿Estás seguro de que deseas guardar los cambios?");
        if (!confirm) return;
        try {

            const response = await axios.put(`/api/horarios/${param.p}`, {
                hor4weeks: timeValues,
            })
            console.log(response);
            router.push(`/dashboard/${param.linea}/rutas/${data.ruta}`);
            toast.success("Horario actualizado correctamente");
        } catch (error) {
            toast.error("Error al actualizar el horario");
            console.log(error)
        }
    }

    return (
        <>
            <div className="w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <GoogleMapApiLoader v="beta" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                    <PrincipalMapp params={param} recorrido={recorrido} />
                </GoogleMapApiLoader>
            </div>
            
            <form onSubmit={handleSubmit}  className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                {hor4weeks.map((hor: any, index: number) =>{
                    const rIndex = index;
                    return (  <>           
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-4">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Recorrido {index+1}
                        </h3>
                    </div>
                            {hor.defaultHora.map((item: any, index: number) => { 
                            return(
                                <>
                                    <div className="flex flex-col gap-2 px-6.5">
                                        <h3 className="font-medium text-black dark:text-white">
                                            {item.pdr_name}
                                        </h3>
                                        <input
                                            value={timeValues[rIndex]?.defaultHora[index]?.hora}
                                            onChange={(e) => updateTimeValue(rIndex, index, item, e.target.value)}
                                            required
                                            type="time"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                        <SelectUnidad params={param} onChange={(e) => updateUnitValue(rIndex, index, item, e.target.value)} />
                                    </div>
                                </>
                            )
                        })}
                </div>
                    </>)
                } )}

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