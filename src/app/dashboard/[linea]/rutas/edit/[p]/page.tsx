import PdrHorarioEdit from "@/components/Dashboard/PdrHorarioEdit";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectDB } from "@/libs/db";
import horarios from "@/models/horarios";

export const metadata: Metadata = {
  title:
    "BusInfoTáchira - App de transporte público para el estado Táchira, Venezuela",
  description: "Visualización de rutas de transporte público en el estado Táchira, Venezuela",
};
async function fetchData({ params }: { params: { linea: any, p: any } }) {
  connectDB();
  const adminFound = await horarios.findOne({
    _id: params.p,
  });
  return adminFound;
}
export default async function Home({ params }: { params: { linea: any, p: any  }    }) {
  const param = params;
  const data = await fetchData({ params }); 
  return (
    <>
      <DefaultLayout params = {param}>
        <PdrHorarioEdit mapa={JSON.stringify(data)} params = {param}/>
        <ToastContainer /> 
      </DefaultLayout>
    </>
  );
}
