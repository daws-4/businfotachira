import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import administradores from "@/models/administradores";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { cookies } from "next/headers";
const jwtName = process.env.JWT_NAME;
    if (!jwtName) {
      throw new Error("JWT_NAME is not defined in environment variables");
    }
  
export async function GET(request: any, {params}: {params: {adid: string}}) {
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
        connectDB();
        try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
            const adminFound = await administradores.findOne({
              username: params.adid,
            });
            console.log(adminFound);
            if (!adminFound) {
              return NextResponse.json(
                { message: "Admin not found" },
                { status: 404 }
              );
            } else {
              return NextResponse.json(adminFound);
            }
        } catch (error) {
            return NextResponse.json((error as Error).message, { status: 400 });
        }
        
        
     }

     
export async function PUT(request:any, {params}: {params:{adid:string}}){
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);

  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
      const { username, contraseña, rol } = await request.json();
      const password = await bcrypt.hash(contraseña, 10);
      const updateAdmin = await administradores.findOneAndUpdate(
        { username: params.adid },
        { username, password, rol },
        { new: true }
      );
      console.log(updateAdmin);
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
    return NextResponse.json({message: "Actualizando Datos"});
}


export async function DELETE(request:any, {params}: {params:{adid:string}}){
  const cookieStore = cookies();
  const token: any = cookieStore.get(jwtName as any);
  try {
       jwt.verify(token.value, process.env.JWT_SECRET as Secret) as JwtPayload;
    const deleteAdmin = await administradores.findOneAndDelete({
      username: params.adid,
    });
    console.log(deleteAdmin);
    if (!deleteAdmin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 })}
          return NextResponse.json (deleteAdmin)
  } catch (error) {
    return NextResponse.json((error as Error).message, { status: 400 });
  }
  return NextResponse.json({message: "Admin Deleted"});
}

