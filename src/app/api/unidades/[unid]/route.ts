import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import unidades from "@/models/unidades";

export async function GET(
  request: any,
  { params }: { params: { unid: string } }
) {
  connectDB();
  try {
    const adminFound = await unidades.findOne({
      placa: params.unid,
    });
    console.log(adminFound);
    if (!adminFound) {
      return NextResponse.json(
        { message: "unidad no encontrada" },
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
  { params }: { params: { unid: string } }
) {
  try {
    const { placa, numero, nombre_conductor, linea } = await request.json();
    const updateAdmin = await unidades.findOneAndUpdate(
      { placa: params.unid },
      { placa, numero, nombre_conductor, linea },
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
  { params }: { params: { unid: string } }
) {
  try {
    const deleteAdmin = await unidades.findOneAndDelete({
      placa: params.unid,
    });
    console.log(deleteAdmin);
    if (!deleteAdmin) {
      return NextResponse.json(
        { message: "unidad no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(deleteAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}