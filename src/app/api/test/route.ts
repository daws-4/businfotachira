import { NextResponse} from "next/server";
import {connectDB} from '@/libs/db'
import administradores from '@/models/administradores'

export async function GET(request: any) {
    connectDB()
    const admins = await administradores.find()
    return NextResponse.json (admins)
}