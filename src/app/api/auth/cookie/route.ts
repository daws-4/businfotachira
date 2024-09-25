import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET() {
     const jwtName = process.env.JWT_NAME;
    if (!jwtName) {
      throw new Error("JWT_NAME is not defined in environment variables");
    }
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);

  if (token && token.value) {
    try {
      const { nombre, username, email, rol, telefono, direccion, timestamps, localidad } =
        jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;

      return NextResponse.json({
        email,
        rol,
        nombre,
        username,
        telefono,
        direccion,
        timestamps,
        localidad
      });
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "Token not found",
      },
      {
        status: 401,
      }
    );
  }
}
