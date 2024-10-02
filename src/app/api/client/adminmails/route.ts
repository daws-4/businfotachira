import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import adminmails from "@/models/adminmails";
connectDB();

export async function POST(request: any) {
  try {
    const { alias, cedula_identidad, email, mensaje} = await request.json();
    const newAdmin = new adminmails({ alias, cedula_identidad, email, mensaje });
    const savedAdmin = await newAdmin.save();
    console.log(savedAdmin);
    return NextResponse.json(savedAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}