import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import posts from "@/models/posts";
connectDB();
export async function POST(request: any) {
  try {
    const { id, url, linea, titulo, texto } = await request.json();
    const newUnidad = new posts({ id, url, linea, titulo, texto });
    const savedUnidad = await newUnidad.save();
    console.log(savedUnidad);
    return NextResponse.json(savedUnidad);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
}
export async function GET(request: any) {
  const admins = await posts.find();
  return NextResponse.json(admins);
}
