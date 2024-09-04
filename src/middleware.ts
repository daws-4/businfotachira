import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: any) {
  const jwt = request.cookies.get(process.env.JWT_NAME);
  try {

    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    if (
      request.nextUrl.pathname.includes("/login") ||
      request.nextUrl.pathname.includes("/logadmin")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if ((payload.rol as number) == 0 && request.nextUrl.pathname.includes(`/dashboard/${payload.username}`)) {
        return NextResponse.next();
    }else if ((payload.rol as number) == 5 && request.nextUrl.pathname.includes(`/dashboard`)) {
        return NextResponse.next();
    }else{
        return NextResponse.redirect(new URL(`/dashboard/${payload.username}`, request.url));
    } 
  } catch (error) {
    if(request.nextUrl.pathname.includes("/dashboard")){
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
  }
}
export const config = {
  matcher: ["/login", "/logadmin", "/dashboard/:path*"],
};
