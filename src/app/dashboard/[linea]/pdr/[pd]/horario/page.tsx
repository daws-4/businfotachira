import PdrHorario from "@/components/Dashboard/PdrHorario";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectDB} from "@/libs/db";
import mapa from "@/models/mapa";

export const metadata: Metadata = {
  title:
    "BusInfoTáchira - App de transporte público para el estado Táchira, Venezuela",
  description: "Visualización de rutas de transporte público en el estado Táchira, Venezuela",
};
async function fetchData({ params }: { params: { linea: any, pd: any } }){
  connectDB();
  const adminFound = await mapa.findOne({
    _id: params.pd,
  });
  return adminFound;
}

export default async function Home({ params }: { params: { linea: any, pd: any  }    }) {
  const param = params;
  const data = await fetchData({ params }); 
  return (
    <>
      <DefaultLayout params = {param}>
        <PdrHorario mapa={JSON.stringify(data)} params = {param}/>
        <ToastContainer /> 
      </DefaultLayout>
    </>
  );
}
