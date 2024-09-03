import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import horario from "@/models/horario";
connectDB();
export async function POST(request: any) {
  try {
    const { id, linea, ruta, fecha_hora, unidad } = await request.json();
    const newUnidad = new horario({ id, linea, ruta, fecha_hora, unidad });
    const savedUnidad = await newUnidad.save();
    console.log(savedUnidad);
    return NextResponse.json(savedUnidad);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function GET(request: any) {
  const admins = await horario.find();
  return NextResponse.json(admins);
}
