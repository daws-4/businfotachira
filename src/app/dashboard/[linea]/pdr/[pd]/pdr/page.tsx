import PdrPage from "@/components/Dashboard/PdrPage";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title:
    "BusInfoTáchira - App de transporte público para el estado Táchira, Venezuela",
  description: "Visualización de rutas de transporte público en el estado Táchira, Venezuela",
};

export default function Home({ params }: { params: { linea: any, pd: any  }    }) {
  const param = params;
  return (
    <>
      <DefaultLayout params = {param}>
        <PdrPage params = {param}/>
        <ToastContainer /> 
      </DefaultLayout>
    </>
  );
}
