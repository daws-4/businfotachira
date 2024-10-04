import Client from "@/components/Client/Client";
import { Metadata } from "next";
import ClientLayout from "@/components/Layouts_client/ClientLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectDB } from "@/libs/db";
import lineas from "@/models/lineas";

export const metadata: Metadata = {
    title:
        "BusInfoTáchira - App de transporte público para el estado Táchira, Venezuela",
    description: "Visualización de rutas de transporte público en el estado Táchira, Venezuela",
};
async function fetchData() {
    await connectDB(); // Asegurarse de que la conexión a la base de datos se haya establecido correctamente
    const allLines = await lineas.find({});
    return allLines;
}


export default async function Home() {
    const linea = await fetchData();
   
    return (
        <>
        <ClientLayout>
            <Client linea={JSON.stringify(linea)} />
            <ToastContainer />
        </ClientLayout>
        </>
    );
}
