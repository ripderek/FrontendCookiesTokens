import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const jwt = request.cookies.get("myTokenName");
    console.log(jwt);
    if (!jwt) return NextResponse.redirect(new URL("/users/login", request.url));

    try {
        const { payload } = await jwtVerify(
            jwt.value,
            new TextEncoder().encode("SECRET")
        );
        console.log({ payload });
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/users/login", request.url));
    }
}

export const config = {
    matcher: ["/task/:path*"],
};