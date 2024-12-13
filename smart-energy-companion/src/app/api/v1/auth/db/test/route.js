'use server';
import dbClient from "@/server/db/mongoDb";
import { NextResponse } from "next/server";


// Test connection to MongoDB
export async function GET() {
    try {
        await dbClient.connect();
        console.log('Connection Test Successful');
        return NextResponse.json({ message: 'Connection successful', project: 'Smart Energy Companion' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Connection failed', error: error.message }, { status: 400 });
    }
}