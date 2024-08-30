import { NextResponse} from "next/server";
import {connectDB} from '@/libs/db'

export function GET(request: any) {
    connectDB()
    return NextResponse.json ({message: 'Hello World'})
}