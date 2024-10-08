import Linea from "@/components/Client/Linea";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts_client/DefaultLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectDB } from "@/libs/db";
import lineas from "@/models/lineas";

export const metadata: Metadata = {
    title:
        "BusInfoTáchira - App de transporte público para el estado Táchira, Venezuela",
    description: "Visualización de rutas de transporte público en el estado Táchira, Venezuela",
};
async function fetchData(param:any) {
    await connectDB(); // Asegurarse de que la conexión a la base de datos se haya establecido correctamente
    const linea = await lineas.findOne({
        username: param.lin,
    });
    return linea;
}


export default async function Home({ params }: { params: { lin: string } }) {
    const param = params
    const linea = await fetchData(param);

    return (
        <>
            <DefaultLayout params={param}>
                <Linea linea = {JSON.stringify(linea)}/>
                <ToastContainer />
            </DefaultLayout>
        </>
    );
}