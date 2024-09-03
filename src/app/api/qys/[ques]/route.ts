import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import qys from "@/models/qys";

export async function GET(
  request: any,
  { params }: { params: { ques: string } }
) {
  connectDB();
  try {
    const adminFound = await qys.findOne({
      id: params.ques,
    });
    console.log(adminFound);
    if (!adminFound) {
      return NextResponse.json(
        { message: "qys no encontrado" },
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
  { params }: { params: { ques: string } }
) {
  try {
    const { id, nombre_usuario, email, mensaje, id_ruta } = await request.json();
    const updateAdmin = await qys.findOneAndUpdate(
      { id: params.ques },
      { id, nombre_usuario, email, mensaje, id_ruta },
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
  { params }: { params: { ques: string } }
) {
  try {
    const deleteAdmin = await qys.findOneAndDelete({
      id: params.ques,
    });
    console.log(deleteAdmin);
    if (!deleteAdmin) {
      return NextResponse.json(
        { message: "qys no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(deleteAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
