import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    try {
        const { pathname } = req.nextUrl;

        // Define public routes that don't require authentication
        const publicRoutes = [
            '/api/v1/auth/user/register',
            '/api/v1/auth/user/login',
            '/api/v1/auth/admin/register',
            '/api/v1/auth/admin/login',
            '/api/v1/auth/db/test',
            '/api/v1/auth/decrypt',
        ];

        // Allow public routes to proceed without token validation
        if (publicRoutes.some((route) => pathname.includes(route))) {
            return NextResponse.next();
        }

        // Retrieve the token for protected routes
        const token = await getToken({
            req,
            secret: process.env.AUTH_SECRET,
            // secureCookie: process.env.NODE_ENV === 'production',
            // cookieName: '__Secure-authjs.session-token',
        });

        if (!token) {
            console.error('No token found for protected route');
            console.log({token});
            return NextResponse.redirect(new URL('/', req.url));
        }

        const userRole = token.role;

        // Role-based access logic for frontend paths
        const rolePaths = {
            Admin: '/admin',
            User: '/user',
        };

        // Check role access for frontend routes
        if (!pathname.startsWith('/api')) {
            const expectedPath = rolePaths[userRole];
            if (expectedPath && pathname.includes(expectedPath)) {
                return NextResponse.next();
            }
            console.warn(`Access denied for Role: ${userRole} on Path: ${pathname}`);
            return NextResponse.redirect(new URL('/', req.url));
        }
        // Allow access to protected API routes
        console.log(`Protected API route accessed: ${pathname} by role: ${userRole}`);
        return NextResponse.next();
    } catch (error) {
        console.error('Middleware Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export const config = {
    matcher: ['/api/v1/:path*', '/user/:path*', '/admin/:path*'], // Match protected routes
};
