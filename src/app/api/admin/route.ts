import { connectDB } from "@/libs/db";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import administradores from "@/models/administradores";
        connectDB();
export async function POST(request: any) {


    try{
    const { username, contraseña, rol } = await request.json();
    const password = await bcrypt.hash(contraseña, 10);
    const newAdmin = new administradores({username, password, rol});
    const savedAdmin = await newAdmin.save();
    console.log(savedAdmin);
    return NextResponse.json(savedAdmin);
    } catch (error) {
        return NextResponse.json((error as Error).message, {status: 400});
    }

}
export async function GET(request: any) {
    const admins = await administradores.find();
    return NextResponse.json(admins);
}