// user login
'use server';
import {NextResponse} from 'next/server';
import UserController from "@/server/controllers/UserController";


export async function POST(request) {
    const obj = await request.json();
    try {
        const user = await UserController.Login(obj);
        const data = {
            email: user.email,
            role: user.role,
            id: user._id
        }
        // Return the authenticated user data (user id, role)
        return NextResponse.json(
            {message: 'Login successful', data},
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json({message: 'Login failed', error: error.message}, {status: 400});
    }
}