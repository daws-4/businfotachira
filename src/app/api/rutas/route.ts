import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import rutas from "@/models/rutas";
connectDB();
export async function POST(request: any) {
  try {
    const { id, linea } = await request.json();
    const newUnidad = new rutas({ id,linea});
    const savedUnidad = await newUnidad.save();
    console.log(savedUnidad);
    return NextResponse.json(savedUnidad);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function GET(request: any) {
  const admins = await rutas.find();
  return NextResponse.json(admins);
}