import { connectDB } from "@/libs/db";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import rutas from "@/models/rutas";
connectDB();

const jwtName = process.env.JWT_NAME;
    if (!jwtName) {
      throw new Error("JWT_NAME is not defined in environment variables");
    }
export async function POST(request: any) {
     
  try {
    
   const cookieStore = cookies();
   const token: any = cookieStore.get(jwtName as any);
    jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
    const {nombre, linea, localidad, descripcion} = await request.json();
    const newUnidad = new rutas({nombre, linea, localidad, descripcion});
    const savedUnidad = await newUnidad.save();
    console.log(savedUnidad);
    return NextResponse.json(savedUnidad);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function GET(request: any) {
       const cookieStore = cookies();
       const token: any = cookieStore.get(jwtName as any);
  try {
      
     jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
  const admins = await rutas.find();
  return NextResponse.json(admins);
  } catch (error) {
    
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
