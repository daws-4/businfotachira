import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import rutas from "@/models/rutas";

const jwtName = process.env.JWT_NAME;
    if (!jwtName) {
      throw new Error("JWT_NAME is not defined in environment variables");
    }
  
export async function GET(
  request: any,
  { params }: { params: { rut: string } }
) {
  connectDB();
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
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
    const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);

  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
    const {ci_conductor, linea, localidad, descripcion } = await request.json();
    const updateAdmin = await rutas.findOneAndUpdate(
      { _id: params.rut },
      {ci_conductor, linea, localidad, descripcion },
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
    const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);

  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
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
