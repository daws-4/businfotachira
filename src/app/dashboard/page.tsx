'use client'
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation";
import axios from 'axios'

 
export default function Home() {
  const [user, setUser] = useState({})
  const router = useRouter()

      useEffect(() => {
    const getUser = async () => {
      const usuario = await axios.get("/api/auth/cookie");
      setUser(usuario);
      console.log(usuario);
    }
     
  getUser()
}, [])

 const logout = async () => {
   try {
     const res = await axios.get("/api/auth/logout");
   } catch (error: any) {
     console.error(error.message);
   }
   router.push("/");
 };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={()=> logout()}>logout</button>
    </div>
  );
}
