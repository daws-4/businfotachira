import Cartelera from "@/components/Client/Cartelera";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts_client/DefaultLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectDB } from "@/libs/db";
import posts from "@/models/posts";

export const metadata: Metadata = {
    title:
        "BusInfoTáchira - App de transporte público para el estado Táchira, Venezuela",
    description: "Visualización de rutas de transporte público en el estado Táchira, Venezuela",
};
async function fetchData(param: any) {
    await connectDB(); // Asegurarse de que la conexión a la base de datos se haya establecido correctamente
    const post: any = await posts.find({
        linea: param.lin,
    });
    return post;
}


export default async function Home({ params }: { params: { lin: string } }) {
    const param = params
    const posts = await fetchData(param);

    return (
        <>
            <DefaultLayout params={param}>
                <Cartelera params={param} posts={JSON.stringify(posts)} />
                <ToastContainer/>
            </DefaultLayout>
        </>
    );
}