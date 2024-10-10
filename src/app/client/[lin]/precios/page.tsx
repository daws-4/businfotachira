import Precios from "@/components/Client/Precios";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts_client/DefaultLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectDB } from "@/libs/db";
import precios from "@/models/precios";

export const metadata: Metadata = {
    title:
        "BusInfoTáchira - App de transporte público para el estado Táchira, Venezuela",
    description: "Visualización de rutas de transporte público en el estado Táchira, Venezuela",
};


export default async function Home({ params }: { params: { lin: string } }) {
    const param = params

    return (
        <>
            <DefaultLayout params={param}>
                <Precios params={param} />
                <ToastContainer/>
            </DefaultLayout>
        </>
    );
}