import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import qys from "@/models/qys";
connectDB();
export async function POST(request: any) {
  try {
    const { id, nombre_usuario, email, mensaje, id_ruta } =
      await request.json();
    const newUnidad = new qys({ id, nombre_usuario, email, mensaje, id_ruta });
    const savedUnidad = await newUnidad.save();
    console.log(savedUnidad);
    return NextResponse.json(savedUnidad);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function GET(request: any) {
  const admins = await qys.find();
  return NextResponse.json(admins);
}
