import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import rutas from "@/models/rutas";

export async function GET(
  request: any,
  { params }: { params: { rut: string } }
) {
  connectDB();
  try {
    const adminFound = await rutas.findOne({
      _id: params.rut,
    });
    console.log(adminFound);
    if (!adminFound) {
      return NextResponse.json(
        { message: "ruta no encontrada" },
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
  { params }: { params: { rut: string } }
) {
  try {
    const { linea, localidad, descripcion } = await request.json();
    const updateAdmin = await rutas.findOneAndUpdate(
      { _id: params.rut },
      { linea, localidad, descripcion },
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
  { params }: { params: { rut: string } }
) {
  try {
    const deleteAdmin = await rutas.findOneAndDelete({
      _id: params.rut,
    });
    console.log(deleteAdmin);
    if (!deleteAdmin) {
      return NextResponse.json(
        { message: "ruta no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(deleteAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
