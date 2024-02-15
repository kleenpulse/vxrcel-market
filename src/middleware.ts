import { NextRequest } from "next/server";
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
} from "./routes";
import { getServerSideUser } from "./lib/payload-utils";

export default async function auth(req: NextRequest) {
	const { nextUrl, cookies } = req;

	const { user } = await getServerSideUser(cookies);
	const isLoggedIn = !!user;
	console.log("IS LOGGED IN:", isLoggedIn);
	const { pathname } = nextUrl;
	const isAuthRoute = authRoutes.includes(pathname);
	const isApiRoute = pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(pathname);

	if (isApiRoute) return null;

	if (isLoggedIn && isAuthRoute) {
		return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
	}

	if (!isLoggedIn && (isAuthRoute || isPublicRoute)) return null;

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL("/sign-in", nextUrl));
	}

	return null;
}

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
