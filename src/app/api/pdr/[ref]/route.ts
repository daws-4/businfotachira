import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import pdr from "@/models/pdr";

export async function GET(
  request: any,
  { params }: { params: { ref: string } }
) {
  connectDB();
  try {
    const adminFound = await pdr.findOne({
      id: params.ref,
    });
    console.log(adminFound);
    if (!adminFound) {
      return NextResponse.json(
        { message: "pdr no encontrado" },
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
  { params }: { params: { ref: string } }
) {
  try {
    const { id, ubicacion_url, linea, ruta} = await request.json();
    const updateAdmin = await pdr.findOneAndUpdate(
      { id: params.ref },
      { id, ubicacion_url, linea, ruta },
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
  { params }: { params: { ref: string } }
) {
  try {
    const deleteAdmin = await pdr.findOneAndDelete({
      id: params.ref,
    });
    console.log(deleteAdmin);
    if (!deleteAdmin) {
      return NextResponse.json(
        { message: "pdr no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(deleteAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
