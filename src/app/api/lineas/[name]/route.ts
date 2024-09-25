import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import lineas from "@/models/lineas";
const jwtName = process.env.JWT_NAME;
    if (!jwtName) {
      throw new Error("JWT_NAME is not defined in environment variables");
    }
  
export async function GET(request: any, {params}: {params: {name: string}}) {
        connectDB();
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
        try {
          
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
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
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
    
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
      const { email, telefono, direccion, nombre, localidad } = await request.json();
      const updateAdmin = await lineas.findOneAndUpdate(
        { username: params.name },
        { email, telefono, direccion, nombre, localidad },
        { new: true }
      );
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
    return NextResponse.json({message: "Actualizando Datos"});
}
export async function DELETE(request:any, {params}: {params:{name:string}}){
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
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