import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import mapa from "@/models/mapa";
connectDB();
export async function POST(request: any) {
  try {
    const { Monto_USD, Monto_COP, Monto_BSD } = await request.json();
    const newUnidad = new mapa({ Monto_USD, Monto_COP, Monto_BSD });
    const savedUnidad = await newUnidad.save();
    console.log(savedUnidad);
    return NextResponse.json(savedUnidad);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function GET(request: any) {
  const admins = await mapa.find();
  return NextResponse.json(admins);
}
