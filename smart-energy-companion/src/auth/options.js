import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthController from '@/server/controllers/AuthController';
import dbClient from '@/server/db/mongoDb';
import getEnergyCompanionModels from "@/server/models/EnergyCompanion/EnergyCompanion";

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {},
                role: {}, // Include role as part of the credentials
            },
            authorize: async (credentials) => {
                try {
                    // Ensure connection to the database
                    await dbClient.connect();

                    // Load the models (all roles use the same Navigator base schema)
                    const { EnergyCompanion } = await getEnergyCompanionModels();

                    // Find the user by email
                    const user = await EnergyCompanion.findOne({ email: credentials.email }).select("+password");
                    if (!user) {
                      return new Error("User not found");
                    }
                    const isPasswordValid = await AuthController.comparePassword(credentials?.password, user.password);
                    if (!isPasswordValid) {
                        return new Error("Invalid credentials");
                    }
                    // Return user details for JWT and session
                    return { id: user._id, role: user.role };
                } catch (error) {
                    console.error("Error during login:", error);
                    return null;
                } finally {
                    await dbClient.close(); // Ensure the database connection is closed
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 3 * 30 * 24 * 60 * 60, // 3 months
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        encryption: true, // Use JWE for JWT encryption
    },
    secret: process.env.AUTH_SECRET,
};

export default options;
