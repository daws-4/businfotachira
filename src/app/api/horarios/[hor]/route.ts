import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import horario from "@/models/horario";

export async function GET(
  request: any,
  { params }: { params: { hor: string } }
) {
  connectDB();
  try {
    const adminFound = await horario.findOne({
      id: params.hor,
    });
    console.log(adminFound);
    if (!adminFound) {
      return NextResponse.json(
        { message: "horario no encontrado" },
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
  { params }: { params: { hor: string } }
) {
  try {
    const { id, linea, ruta, fecha_hora, unidad } = await request.json();
    const updateAdmin = await horario.findOneAndUpdate(
      { id: params.hor },
      { id, linea, ruta, fecha_hora, unidad },
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
  { params }: { params: { hor: string } }
) {
  try {
    const deleteAdmin = await horario.findOneAndDelete({
      id: params.hor,
    });
    console.log(deleteAdmin);
    if (!deleteAdmin) {
      return NextResponse.json(
        { message: "horario no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(deleteAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
