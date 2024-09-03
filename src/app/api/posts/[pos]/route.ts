import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import posts from "@/models/posts";

export async function GET(
  request: any,
  { params }: { params: { pos: string } }
) {
  connectDB();
  try {
    const adminFound = await posts.findOne({
      id: params.pos,
    });
    console.log(adminFound);
    if (!adminFound) {
      return NextResponse.json(
        { message: "posts no encontrado" },
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
  { params }: { params: { pos: string } }
) {
  try {
    const { id, url, linea, titulo, texto } = await request.json();
    const updateAdmin = await posts.findOneAndUpdate(
      { id: params.pos },
      { id, url, linea, titulo, texto },
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
  { params }: { params: { pos: string } }
) {
  try {
    const deleteAdmin = await posts.findOneAndDelete({
      id: params.pos,
    });
    console.log(deleteAdmin);
    if (!deleteAdmin) {
      return NextResponse.json(
        { message: "posts no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(deleteAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
