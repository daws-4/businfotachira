import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { connectDB } from "@/libs/db";
import lineas from "@/models/lineas";
import bcrypt from "bcryptjs";

export async function POST(request: any) {
  connectDB();

  const { username, contraseña } = await request.json();
  const result = await lineas.findOne({ username: username });
  if (
    result.length == 0 ||
    !(await bcrypt.compare(contraseña, result.password))
  ) {
    return NextResponse.json(
      {
        message: "Invalid credentials",
      },
      {
        status: 401,
      }
    );
  } else {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const jwtName = process.env.JWT_NAME;
    if (!jwtName) {
      throw new Error("JWT_NAME is not defined in environment variables");
    }

    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        email: result.email,
        rol: result.rol,
        nombre: result.nombre,
        username: result.username,
        telefono: result.telefono,
        direccion: result.direccion,

      },
      jwtSecret
    );

    const response = NextResponse.json({
      token,
      message: "Login successful",
    });

    response.cookies.set({
      name: jwtName,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 2,
      path: "/",
    });

    return response;
  }
}
