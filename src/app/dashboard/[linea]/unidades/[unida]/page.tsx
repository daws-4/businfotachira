import Unidadesview from "@/components/Dashboard/Unidadesview";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title:
    "BusInfoTáchira - App de transporte público para el estado Táchira, Venezuela",
  description: "Visualización de rutas de transporte público en el estado Táchira, Venezuela",
};

export default function Home({ params }: { params: { linea: any, unida: any  }    }) {
  const param = params;
  return (
    <>
      <DefaultLayout params = {param}>
        <Unidadesview params = {param}/>
        <ToastContainer /> 
      </DefaultLayout>
    </>
  );
}
