import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import horarios from "@/models/horarios";
import { ObjectId } from 'mongodb';
const jwtName = process.env.JWT_NAME;
    if (!jwtName) {
      throw new Error("JWT_NAME is not defined in environment variables");
    }
  
export async function GET(
  request: any,
  { params }: { params: { hor: string } }
) {
  connectDB();
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
    const adminFound = await horarios.find({
      recorrido: params.hor,
    });
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
  
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
    const { linea, ruta, recorrido, hor4weeks, fecha} = await request.json();
    const updateAdmin = await horarios.findOneAndUpdate(
      { _id: params.hor },
      {linea, ruta, recorrido, hor4weeks, fecha},
      { new: true }
    );
    console.log('se han actualizado: ',updateAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
  return NextResponse.json({ message: "Actualizando Datos" });
}
export async function DELETE(
  request: any,
  { params }: { params: { hor: string } }
) {
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
    const deleteAdmin = await horarios.deleteMany({
      recorrido: params.hor,
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
