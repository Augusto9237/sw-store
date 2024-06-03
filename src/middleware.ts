import { NextResponse } from "next/server";
import { auth } from "@/auth"
import { compareSync } from "bcrypt-ts";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default auth((req) => {
    const reqUrl = new URL(req.url);
    const user = req.auth?.user;
    const role = req.cookies.get("role_token");
    const matches = compareSync("admin", role?.value ?? '')

    if (reqUrl.pathname === "/dashboard" || reqUrl.pathname === "/products" || reqUrl.pathname === "/order" || reqUrl.pathname === "/users" || reqUrl.pathname === "/team") {
        if (!user) {
            return NextResponse.redirect(
                new URL(
                    `${process.env.HOST_URL}/admin`, req.url)
            );
        }

        if (user) {
            if (!matches) {
                return NextResponse.redirect(
                    new URL(
                        `${process.env.HOST_URL}/admin`, req.url)
                );
            }
        }
        return NextResponse.next();
    }
})