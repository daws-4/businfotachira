import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import unidades from "@/models/unidades";
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
    const {ci_conductor, placa, numero, nombre_conductor, linea } = await request.json();
    const newUnidad = new unidades({
      ci_conductor, placa, numero, nombre_conductor, linea
    });
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
  const admins = await unidades.find();
  return NextResponse.json(admins);
  } catch (error) {
      
      return NextResponse.json((error as Error).message, { status: 400 });
  }
}
