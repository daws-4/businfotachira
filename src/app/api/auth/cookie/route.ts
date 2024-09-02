import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET() {
  const cookieStore = cookies();
  const token: any = cookieStore.get("TokenLogin");

  if (token && token.value) {
    try {
      const { nombre, username, email, rol, telefono, direccion, timestamps } =
        jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;

      return NextResponse.json({
        email,
        rol,
        nombre,
        username,
        telefono,
        direccion,
        timestamps
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
