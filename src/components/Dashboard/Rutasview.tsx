"use client";
import React from "react";
import CardData from "../CardData";
import PrincipalMap2 from "@/components/mapas/PrincipalMap2";
import { GoogleMapApiLoader } from 'react-google-map-wrapper'
import axios from "axios";
import SelectLocalidad from "@/components/SelectGroup/SelectLocalidad";
import SelectMapa from "@/components/SelectGroup/SelectMapa";
import SelectDate from "../SelectGroup/SelectDate";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from 'react-data-table-component';
import Link from "next/link";



interface CarteleraProps {
    params: { linea: any, taru: any };
}

const Rutasview: React.FC<CarteleraProps> = ({ params }) => {
    const param = params
    const [fechaUrl, setFechaUrl] = useState<string | null>(null);
    const [fecha, setFecha] = useState<string | null>(null);
    const [fechas, setFechas] = useState<any>([]);
    const [deleteHor, setDeleteHor] = useState<any>();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [data, setData] = useState<any>([]);
    const [localidad, setLocalidad] = useState<number>();
    const [sector, setSector] = useState("San Cristóbal");
    const [mapa, setMapa] = useState<any>();
    const [unidades, setUnidades] = useState<any>([]);
    const [mapData, setMapData] = useState<any>([]);
    const [dataTable, setDataTable] = useState<DataRow[]>([]);
    const [filteredDataTable, setFilteredDataTable] = useState<DataRow[]>([]);
    const [filteredTodayDataTable, setFilteredTodayDataTable] = useState<DataRow[]>([]);
    const [horarios, setHorarios] = useState<any>([]);
    const [PperPage, setPperPage] = useState<number>();
    
    const router = useRouter();
    const handleLocalidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "0") {
            setLocalidad(0);
            console.log(e.target.value);
        } else if (e.target.value === "1") {
            setLocalidad(1);
            console.log(e.target.value);
        } else if (e.target.value === "2") {
            setLocalidad(2);
            console.log(e.target.value);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response0 = await axios.get(`/api/unidades`);
                setUnidades(response0.data.filter((item: any) => item.linea === params.linea));
                console.log(response0.data);
                const responseDel = await axios.get(`/api/mapa/${params.taru}`);
                setDeleteHor(responseDel.data.flatMap((id: any) => id._id));
                const response = await axios.get(`/api/rutas/${params.taru}`);
                setData(response.data);
                setNombre(response.data.nombre);
                setDescripcion(response.data.descripcion);
                if (response.data.localidad === 1) {
                    setSector('San Cristóbal - Cárdenas');
                } else if (response.data.localidad === 2) {
                    setSector('San Cristóbal - Torbes');
                }else if (response.data.localidad === 3) {
                    setSector('San Cristóbal - Guásimos');
                }else if (response.data.localidad === 4) {
                    setSector('San Cristóbal - Andrés Bello');
                }

                
            } catch (error) {
                router.push(`/dashboard/${params.linea}/rutas`);
            }
            const response2 = await axios.get(`/api/mapa/${params.taru}`);
            const filteredMap = response2.data.filter((item: any) => item._id == mapa);
            console.log(filteredMap)
            setMapData(filteredMap);

            if (mapa) {
                const response3 = await axios.get(`/api/horarios/${mapa}`);
                console.log(response3)
                setHorarios(response3.data);
}
            

        };
        fetchData();
    }, [params.taru, mapa, params.linea, router]);
    useEffect(() => {
        if (data._id && params.taru != data._id) {
            router.push(`/dashboard/${params.linea}/rutas`);
        }
    }, [data, params.taru, params.linea, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
        console.log(e.target.value);
    }


    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro que deseas ELIMINAR esta ruta?"
        );
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/rutas/${id}`, {
                    method: 'DELETE',
                });
                for (const horId of deleteHor) {
                    const response = await fetch(`/api/mapas/${horId}`, {
                        method: 'DELETE',
                    });
                    const response0 = await fetch(`/api/horarios/${horId}`, {
                        method: 'DELETE',
                    });
                    if (response.ok && response0.ok) {
                        toast.success(`Ruta con ID ${horId} eliminada correctamente.`);
                    } else {
                        toast.error(`Error al eliminar la Ruta con ID ${horId}.`);
                    }
                }
                if (response.ok) {

                    toast.success("Ruta eliminada correctamente.");
                    router.push(`/dashboard/${params.linea}`);
                } else {
                    toast.error("Error al eliminar la Ruta.");
                }
            } catch (error) {
                console.log(error);
                toast.error("Error al eliminar la Ruta.");
            }
        }
    };
    const handleMapaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFecha(null)
        setMapa(e.target.value)
        console.log(e.target.value)
        setFilteredDataTable([])
        
    }; 
    const handleFechaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFecha(e.target.value)
        setFilteredDataTable(dataTable.filter((item: DataRow) => item.fecha === e.target.value));
        console.log(filteredDataTable)
        console.log(fecha)
    }; 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const uploadData = await axios.put(`/api/rutas/${params.taru}`, {
                nombre: nombre,
                descripcion: descripcion,
                localidad: localidad,
                linea: params.linea,
            })
            window.location.reload();
            toast.success("Ruta Actualizada con éxito!");
        } catch (error) {
            console.log(error);
            toast.error("Error al subir la Ruta.");
        }

    };

    const date = new Date(data.createdAt);
    const formattedDate = date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    //    const truncatedText = data.texto.length > 100 ? data.texto.substring(0, 100) + '...' : data.texto;
    //falta mapear 

    interface DataRow {
        fecha: any;
        pdr_name: any;
        hora: any;
        pdr_id:any;
        unidad:any;
        _id:any
        array_id:any

    }
    const columns = [
        {
            name:'Recorrido',
            selector: (row: DataRow) => {
                return row.array_id+1
            },
        },
        {
            name: 'Punto de Referencia',
            selector: (row: DataRow) => row.pdr_name,
        },
        {
            name: 'Hora',
            selector: (row: DataRow) => (
                <Link href={`/dashboard/${params.linea}/rutas/edit/${fechaUrl}`}>
                    {row.hora}
                </Link>
            ),
        },
        {
            name: 'Fecha',
            selector: (row: DataRow) => row.fecha,
        },
        {
            name: 'Unidad Asignada',
            selector: (row: DataRow) => {
                const unidad = unidades.find((item:any) => item._id === row.unidad);
                return unidad ? `${unidad.nombre_conductor} | Unidad N:${unidad.numero}` : 'no tiene unidad asignada';
            },
        }
    ];


    useEffect(() => {
            const test2= horarios.filter((horario: any) => horario.fecha == fecha)
            const test3 = test2.flatMap((horario: any) => horario._id)
            setFechaUrl(test3[0])
            console.log(test3)
            const test1 = horarios.flatMap((horario: any) => horario.hor4weeks)             
            const horariosMaped:any = test1.flatMap((hor4week: any) => hor4week.defaultHora)
            const fechaTest = horarios.map((horario: any) => horario.fecha)
        // Convertir fechas de string dd/mm/yyyy a Date
        const fechasConvertidas = fechaTest.map((fecha: string) => {
            const [day, month, year] = fecha.split('/');
            return new Date(Number(year), Number(month) - 1, Number(day));
        });

        // Ordenar fechas de forma ascendiente
        fechasConvertidas.sort((a: Date, b: Date) => a.getTime() - b.getTime());

        // Convertir fechas de vuelta a string dd/mm/yyyy para renderizar
        const fechasOrdenadas = fechasConvertidas.map((fecha: Date) => {
            const day = fecha.getDate().toString().padStart(2, '0');
            const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
            const year = fecha.getFullYear();
            return `${day}/${month}/${year}`;
        });
        setFechas(fechasOrdenadas);
        console.log(fechasOrdenadas)
        const updatedDataTable: DataRow[] = horariosMaped? horariosMaped : [];
        setDataTable(updatedDataTable);
        console.log(updatedDataTable);
        const filtrarPorFechaActual = (horarios: any[]) => {
            const hoy = new Date();
            const fechaActual = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

            return horarios.filter((item: any) => {
                const [day, month, year] = item.fecha.split('/');
                const itemDate = new Date(Number(year), Number(month) - 1, Number(day));
                return itemDate.getTime() === fechaActual.getTime();
            });
        };

        // Uso de la función para obtener los elementos con la fecha actual
        const elementosFechaActual = filtrarPorFechaActual(horariosMaped);
        setFilteredTodayDataTable(elementosFechaActual);

    }, [horarios, fecha]);
//paginationperpage = hor4weeks.length * deafultHora.length
    return (
        <> 
            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <CardData
                    username={data.nombre}
                    id={data._id}
                    text={data.descripcion}
                    subtitle={sector}
                    title={data.nombre}
                    rate={formattedDate}
                    levelUp={data.levelUp}
                >
                    <button
                        onClick={() => handleDelete(data._id)}
                        className="inline-flex items-center justify-center rounded-full bg-red px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Eliminar
                    </button>
                </CardData>

            </div>
            <div className=" w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <SelectMapa onChange={handleMapaChange} params={param}></SelectMapa>
                <GoogleMapApiLoader v="beta" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                    <PrincipalMap2 todayData={filteredTodayDataTable} id={mapa} params={param} />
                </GoogleMapApiLoader>
            </div>
            <div className=" w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className='grid grid-cols-1 md:grid-cols-2'>
                <h3 className="font-medium text-black dark:text-white">
                    Horarios diarios
                </h3>
                <div hidden={!dataTable.length}>
                        <SelectDate fechas={fechas} onChange={handleFechaChange} fecha={fecha} setFecha={setFecha}></SelectDate>
                    </div>
                </div>
                {dataTable.length > 0 ? (
                    <DataTable
                        paginationPerPage={PperPage ? PperPage : 8}
                        paginationRowsPerPageOptions={PperPage ? [PperPage] : [8]}
                        striped
                        noDataComponent={"Selecciona una fecha"}
                        responsive
                        pagination
                        columns={columns}
                        data={filteredDataTable}
                    />
                ) : (
                    <p>No data available</p>
                )}
            </div>
            <div className="  sm:w-1/2  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Editar Ruta
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="pb-10">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Editar Nombre
                                </label>
                                <input

                                    value={nombre}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Editar Título"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <SelectLocalidad onChange={handleLocalidadChange} />
                            <label className=" pt-5 mb-3 block text-sm font-medium text-black dark:text-white">
                                Editar Descripcion
                            </label>

                            <textarea
                                rows={6}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Editar Texto"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-full bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                                Actualizar Ruta
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Rutasview;
