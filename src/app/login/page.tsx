"use client";
import { useRouter,  } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios'
 import { toast, ToastContainer } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import "../../../node_modules/react-toastify/dist/react-toastify.esm.mjs";
import {
  Input,
  ShowHideButtom,
  SingInButtom,
} from "../../components/ui/index";



export default function Home() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const router = useRouter();

  const [credencials, setCredencials] = useState({
    email: "",
    contraseña: "",
  })

  const handleChange = (e: { target: { value:string, name:string }; }) => {
    setCredencials({
      ...credencials,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
      try{const response =await axios.post('/api/auth/login', credencials)

    if(response.status === 200){
        setShowSuccessToast(true);
      }
    }catch(error: any){
        if (error.response && error.response.status === 401) {
          setShowErrorToast(true);
        }
      }
  }
   useEffect(() => {
    if (showSuccessToast) {
      toast.success("Iniciando Sesión!", {
        position: "top-center",
        autoClose: 10000,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 100);

      setShowSuccessToast(false);
    }

    if (showErrorToast) {
      toast.error("Correo o Contraseña incorrectos", {
        position: "top-center",
        className: "foo-bar",
        autoClose: false
      });

      setShowErrorToast(false);
    }
  }, [showSuccessToast, showErrorToast, router]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-xl p-8 pb-3 mt-8">
        <h2 className="text-2xl font-bold font-arial  mb-4 text-center text-black">
          Inicia Sesión
        </h2>
        <div className="flex justify-center items-center bg-white rounded-lg p-2 mt-4">
          
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              placeholder="Nombre de Usuario"
              type="text"
              id="username"
              required
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="contraseña"
              name="contraseña"
              placeholder="Contraseña"
              required
              onChange={handleChange}
            />
            <ShowHideButtom onClick={togglePasswordVisibility}>
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#C0C0C0"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#C0C0C0"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </ShowHideButtom>
          </div>
          <div className="text-sm">
            <Link
              href="#"
              className="text-blue-600 hover:underline font-arial text-sm"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div>
            <SingInButtom type="submit">Iniciar Sesión</SingInButtom>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}
