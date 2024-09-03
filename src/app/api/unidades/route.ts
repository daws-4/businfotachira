import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import unidades from "@/models/unidades";
connectDB();
export async function POST(request: any) {
  try {
    const { placa, numero, nombre_conductor, linea } = await request.json();
    const newUnidad = new unidades({
      placa, numero, nombre_conductor, linea
    });
    const savedUnidad = await newUnidad.save();
    console.log(savedUnidad);
    return NextResponse.json(savedUnidad);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function GET(request: any) {
  const admins = await unidades.find();
  return NextResponse.json(admins);
}
