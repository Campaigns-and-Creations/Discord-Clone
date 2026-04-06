import { NextRequest, NextResponse } from "next/server";

const PUBLIC_AUTH_PATHS = new Set(["/auth/sign-in", "/auth/sign-up"]);

function isStaticAsset(pathname: string): boolean {
    return /\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml)$/i.test(pathname);
}

function hasAuthSessionCookie(request: NextRequest): boolean {
    const token = request.cookies.get("better-auth.session_token")?.value;
    const secureToken = request.cookies.get("__Secure-better-auth.session_token")?.value;

    return Boolean(token || secureToken);
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api/") ||
        pathname === "/favicon.ico" ||
        isStaticAsset(pathname)
    ) {
        return NextResponse.next();
    }

    const isAuthenticated = hasAuthSessionCookie(request);
    const isPublicAuthPath = PUBLIC_AUTH_PATHS.has(pathname);

    if (isPublicAuthPath) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    }

    if (!isAuthenticated) {
        const signInUrl = new URL("/auth/sign-in", request.url);

        if (pathname !== "/") {
            signInUrl.searchParams.set("from", pathname);
        }

        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image).*)"],
};
