import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import precios from "@/models/precios";

export async function GET(
  request: any,
  { params }: { params: { pri: string } }
) {
  connectDB();
  try {
    const adminFound = await precios.findOne({
      id: params.pri,
    });
    console.log(adminFound);
    if (!adminFound) {
      return NextResponse.json(
        { message: "precios no encontrado" },
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
  { params }: { params: { pri: string } }
) {
  try {
    const { Monto_USD, Monto_COP, Monto_BSD } = await request.json();
    const updateAdmin = await precios.findOneAndUpdate(
      { id: params.pri },
      { Monto_USD, Monto_COP, Monto_BSD },
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
  { params }: { params: { pri: string } }
) {
  try {
    const deleteAdmin = await precios.findOneAndDelete({
      id: params.pri,
    });
    console.log(deleteAdmin);
    if (!deleteAdmin) {
      return NextResponse.json(
        { message: "precios no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(deleteAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
