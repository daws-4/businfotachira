"use client";
import React from "react";
import CardData from "../CardData";
import PrincipalMap2 from "@/components/Client/PrincipalMap2";
import { GoogleMapApiLoader } from 'react-google-map-wrapper'
import axios from "axios";
import SelectMapa from "@/components/Client/SelectMapa";
import SelectDate from "../SelectGroup/SelectDate";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from 'react-data-table-component';


interface CarteleraProps {
    params: { lin: any, ruts: any };
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response0 = await axios.get(`/api/unidades`);
                setUnidades(response0.data.filter((item: any) => item.linea === params.lin));
                console.log(response0.data);
                const responseDel = await axios.get(`/api/mapa/${params.ruts}`);
                setDeleteHor(responseDel.data.flatMap((id: any) => id._id));
                const response = await axios.get(`/api/rutas/${params.ruts}`);
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
               router.push(`/client/${params.lin}/rutas`);
               console.log(error)
            }
            const response2 = await axios.get(`/api/mapa/${params.ruts}`);
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
    }, [params.ruts, mapa, params.lin, router]);
    useEffect(() => {
        if (data._id && params.ruts != data._id) {
            router.push(`/client/${params.lin}/rutas`);
        }
    }, [data, params.ruts, params.lin, router]);

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

    const customStyles = {
        headCells: {
            style: {
                zindex: "10",
            },
        },
        rows: {
            style: {
                zindex: "10",
            },
        },
    };
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
                <p>
                    {row.hora}
                </p>
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
                </CardData>

            </div>
            <div className=" w-full px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <SelectMapa onChange={handleMapaChange} params={param}></SelectMapa>
                <GoogleMapApiLoader v="beta" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                    <PrincipalMap2 todayData={filteredTodayDataTable} id={mapa} params={param} />
                </GoogleMapApiLoader>
            </div>
            <div id='data' className=" px-7.5 py-6 mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className='grid grid-cols-1 md:grid-cols-2'>
                <h3 className="font-medium text-black dark:text-white">
                    Horarios diarios
                </h3>
                <div hidden={!dataTable.length}>
                        <SelectDate fechas={fechas} onChange={handleFechaChange} fecha={fecha} setFecha={setFecha}/>
                    </div>
                </div>
                <div>
                {dataTable.length > 0 ? (
                        <div className=' max-w-[250px] lg:max-w-[900px] overflow-x-auto'>
                    <DataTable
                        title="Horarios"
                        paginationPerPage={PperPage ? PperPage : 8}
                        paginationRowsPerPageOptions={PperPage ? [PperPage] : [8]}
                        responsive
                        striped
                        noDataComponent={"Selecciona una fecha"}
                        pagination
                        columns={columns}
                        customStyles={customStyles}
                        data={filteredDataTable}
                    />
                    </div>
                ) : (
                    <p>No data available</p>
                )}
                </div>
            </div>
        </>
    );
};

export default Rutasview;
