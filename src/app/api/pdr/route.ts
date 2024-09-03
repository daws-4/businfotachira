import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import pdr from "@/models/pdr";
connectDB();
export async function POST(request: any) {
  try {
    const { id, ubicacion_url, linea, ruta } = await request.json();
    const newUnidad = new pdr({ id, ubicacion_url, linea, ruta});
    const savedUnidad = await newUnidad.save();
    console.log(savedUnidad);
    return NextResponse.json(savedUnidad);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function GET(request: any) {
  const admins = await pdr.find();
  return NextResponse.json(admins);
}
