import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import lineas from "@/models/lineas";

export async function GET(request: any, {params}: {params: {name: string}}) {
        connectDB();
        try {
            const adminFound = await lineas.findOne({
              username: params.name,
            });
            if (!adminFound) {
              return NextResponse.json(
                { message: "Linea no encontrada" },
                { status: 404 }
              );
            } else {
              return NextResponse.json(adminFound);
            }
        } catch (error) {
            return NextResponse.json((error as Error).message, { status: 400 });
        }  
     }
export async function PUT(request:any, {params}: {params:{name:string}}){
  try {
      const { username, contraseña, rol, email, telefono, direccion, nombre } =
        await request.json();
      const password = await bcrypt.hash(contraseña, 10);
      const updateAdmin = await lineas.findOneAndUpdate(
        { username: params.name },
        { username, password, rol, email, telefono, direccion, nombre },
        { new: true }
      );
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
    return NextResponse.json({message: "Actualizando Datos"});
}
export async function DELETE(request:any, {params}: {params:{name:string}}){
  try {
    const deleteAdmin = await lineas.findOneAndDelete({
      username: params.name,
    });
    if (!deleteAdmin) {
      return NextResponse.json(
        { message: "Linea no encontrada" },
        { status: 404 }
      );}
          return NextResponse.json (deleteAdmin)
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}