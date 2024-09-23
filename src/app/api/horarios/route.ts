import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import horarios from "@/models/horarios";
connectDB();
const jwtName = process.env.JWT_NAME;
    if (!jwtName) {
      throw new Error("JWT_NAME is not defined in environment variables");
    }
  
export async function POST(request: any) {
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
    const {linea, ruta, recorrido, hor4weeks, fecha} = await request.json();
    const newUnidad = new horarios({ linea, ruta, recorrido, hor4weeks, fecha});
    const savedUnidad = await newUnidad.save();
    return NextResponse.json(savedUnidad);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function GET(request: any) {
  
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
    
    const {linea, ruta, recorrido} = await request.json();
    jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
    const admins = await horarios.find({ 
      linea:linea, ruta:ruta, recorrido:recorrido });
    return NextResponse.json(admins);
  } catch (error) {
      
      return NextResponse.json((error as Error).message, { status: 400 });
  }
    
}
