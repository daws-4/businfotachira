import { Metadata } from "next";
import { connectDB } from "@/libs/db";
import lineas from "@/models/lineas";
import { Navigation, About, Contact, Header, Team, Services, Testimonials, Features, Gallery } from "@/components/landing/index";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title:
    "BusInfoTáchira - App de transporte público para el estado Táchira, Venezuela",
  description: "Visualización de rutas de transporte público en el estado Táchira, Venezuela",
};
async function fetchData() {
  await connectDB(); // Asegurarse de que la conexión a la base de datos se haya establecido correctamente
  const allLines = await lineas.find({}, { nombre: 1, username: 1, _id: 0 }); // Buscar todas las líneas y devolver los campos 'nombre' y 'username'
  return allLines.map(linea => ({ nombre: linea.nombre, username: linea.username })); // Convertir los datos a un formato JSON simple
}

export default async function Home() {

  const linea = await fetchData(); 
  console.log(linea)

  return (
    <> <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="img/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="img/apple-touch-icon-114x114.png"
      />

      <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
      <link
        rel="stylesheet"
        type="text/css"
        href="fonts/font-awesome/css/font-awesome.css"
      />
      <link rel="stylesheet" type="text/css" href="css/style.css" />
      <link
        rel="stylesheet"
        type="text/css"
        href="css/nivo-lightbox/nivo-lightbox.css"
      />
      <link rel="stylesheet" type="text/css" href="css/nivo-lightbox/default.css" />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:400,700"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900"
        rel="stylesheet"
      />
      <div>
        <Navigation linea={linea}/>
        <Header />
        <Features />
        <About />
        <Gallery />
        <Contact  />
      </div>

      <ToastContainer />
      <script type="text/javascript" src="js/jquery.1.11.1.js"></script   >
      <script type="text/javascript" src="js/bootstrap.js"></script>
      </>
    
  );
};
