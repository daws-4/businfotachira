import Qyspost from "@/components/Client/Qyspost";
import { Metadata } from "next";
import ClientLayout from "@/components/Layouts_client/ClientLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
    title:
        "BusInfoTáchira - App de transporte público para el estado Táchira, Venezuela",
    description: "Visualización de rutas de transporte público en el estado Táchira, Venezuela",
};


export default async function Home() {

    return (
        <>
            <ClientLayout>
                <Qyspost />
                <ToastContainer/>
            </ClientLayout>
        </>
    );
}