import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import mapa from "@/models/mapa";
const jwtName = process.env.JWT_NAME;
    if (!jwtName) {
      throw new Error("JWT_NAME is not defined in environment variables");
    }
  
export async function GET(
  request: any,
  { params }: { params: { ma: string } }
) {
  connectDB();
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
    const adminFound = await mapa.find({
      ruta: params.ma,
    });
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
  { params }: { params: { ma: string } }
) {
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
    const {nombre, ruta, linea, pdr, polilyne} = await request.json();
    const updateAdmin = await mapa.findOneAndUpdate(
      { _id: params.ma },
      {nombre, ruta, linea, pdr, polilyne},
      { new: true }
    );
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
  return NextResponse.json({ message: "Actualizando Datos" });
}
export async function DELETE(
  request: any,
  { params }: { params: { ma: string } }
) {
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
    const deleteAdmin = await mapa.findOneAndDelete({
      _id: params.ma,
    });
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
