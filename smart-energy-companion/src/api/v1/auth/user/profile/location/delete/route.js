// delete a saved location


import { NextResponse } from 'next/server';
import AuthController from '@/server/controllers/AuthController';
import UserController from '@/server/controllers/UserController';

export const dynamic = 'force-dynamic'; // Ensure all routes in /client are dynamic

export async function DELETE(request) {
    try {
        const userId = await AuthController.headlessCheck(request);
        if (userId instanceof Error) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const adressId = await request.json();
        if (!adressId) {
            return NextResponse.json({ message: "Invalid data" }, { status: 400 });
        }
        const userProfile = await UserController.DeleteLocation(userId, adressId);
        if (userProfile instanceof Error) {
            return NextResponse.json({ message: "Failed to delete location" }, { status: 400 });
        }
        return NextResponse.json(userProfile, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

