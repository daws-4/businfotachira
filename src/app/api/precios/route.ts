import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import precios from "@/models/precios";
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
    const {linea, distancia, Monto_USD, Monto_COP, Monto_BSD } = await request.json();
    const newUnidad = new precios({linea, distancia, Monto_USD, Monto_COP, Monto_BSD });
    const savedUnidad = await newUnidad.save();
    console.log(savedUnidad);
    return NextResponse.json(savedUnidad);
  } catch (error) {
    console.log(error)
    return NextResponse.json((error as Error).message, { status: 400 });
    
  }
}
export async function GET(request: any) {
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);

  try {
  const admins = await precios.find();
  return NextResponse.json(admins);
  } catch (error) {
      
      return NextResponse.json((error as Error).message, { status: 400 });
  }
}
