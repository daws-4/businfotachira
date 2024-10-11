import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import lineas from "@/models/lineas";
connectDB();
const jwtName = process.env.JWT_NAME;
    if (!jwtName) {
      throw new Error("JWT_NAME is not defined in environment variables");
    }
  
export async function POST(request: any) {
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;

    const { username, contraseña, email, telefono, direccion, nombre, localidad, rol } = await request.json();
    const password = await bcrypt.hash(contraseña, 10);
    const newAdmin = new lineas({ username, password, rol, email, telefono, direccion, nombre, localidad });
    const savedAdmin = await newAdmin.save();
    console.log(savedAdmin);
    return NextResponse.json(savedAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function GET(request: any) {
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
    const admins = await lineas.find();
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
