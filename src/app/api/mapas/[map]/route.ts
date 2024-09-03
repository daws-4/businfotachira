import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import mapa from "@/models/mapa";

export async function GET(
  request: any,
  { params }: { params: { map: string } }
) {
  connectDB();
  try {
    const adminFound = await mapa.findOne({
      id: params.map,
    });
    console.log(adminFound);
    if (!adminFound) {
      return NextResponse.json(
        { message: "mapa no encontrado" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(adminFound);
    }
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function PUT(
  request: any,
  { params }: { params: { map: string } }
) {
  try {
    const { id, url, linea, mapa, pdr } = await request.json();
    const updateAdmin = await mapa.findOneAndUpdate(
      { id: params.map },
      { id, url, linea, mapa, pdr },
      { new: true }
    );
    console.log(updateAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
  return NextResponse.json({ message: "Actualizando Datos" });
}
export async function DELETE(
  request: any,
  { params }: { params: { map: string } }
) {
  try {
    const deleteAdmin = await mapa.findOneAndDelete({
      id: params.map,
    });
    console.log(deleteAdmin);
    if (!deleteAdmin) {
      return NextResponse.json(
        { message: "mapa no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(deleteAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
