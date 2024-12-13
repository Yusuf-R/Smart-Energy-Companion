import AuthController from "@/server/controllers/AuthController";
import dbClient from "@/server/db/mongoDb";
import getEnergyCompanionModels from "@/server/models/EnergyCompanion/EnergyCompanion";
import {loginValidator, signUpValidator} from "@/validators/userValidators";
import {beProfileUpdateValidator} from "@/validators/beProfileUpdateValidator";
import mongoose from "mongoose";

const {ObjectId} = mongoose.Types;
const {User} = await getEnergyCompanionModels();

class UserController {

    static async RegisterNew(obj) {
        try {
            await dbClient.connect(); // Ensure DB connection

            const {encryptedData} = obj;
            const decryptedData = await AuthController.decryptedCredentials(encryptedData);

            // Validate the user input
            const {success, data} = signUpValidator.safeParse(decryptedData);
            if (!success) throw new Error("Validation failed");

            const {email, password} = data;

            // Check if user already exists
            const existingUser = await User.findOne({email}).select("+password");
            if (existingUser) throw new Error("User already exists");

            // Hash the password before saving the user
            const hashedPassword = await AuthController.hashPassword(password);

            // Create a new user
            const newUser = await User.create({
                email,
                password: hashedPassword,
            });

            return newUser; // Return the newly created user
        } catch (error) {
            console.error("Error in RegisterNew:", error.message);
            throw new Error('User registration failed');
        } finally {
            // disconnect db
            await dbClient.close();
        }
    }

    static async Login(obj) {
        try {
            await dbClient.connect(); // Ensure DB connection

            const {encryptedData} = obj;
            const decryptedData = await AuthController.decryptedCredentials(encryptedData);

            // Validate the user input
            const {success, data} = loginValidator.safeParse(decryptedData);
            if (!success) {
              return new Error("Login-Validation failed");
            }

            const {email, password} = data;

            // Find the user by email
            const user = await User.findOne({email}).select("+password");
            if (!user) {
                return new Error("User not found");
            }

            // Check if the password is correct
            const isPasswordValid = await AuthController.comparePassword(password, user.password);
            if (!isPasswordValid) {
                return new Error("Invalid credentials");
            }
            // set the user status to online
            user.status = "online";
            await user.save();
            return user; // Return the user
        } catch (error) {
            console.error("Error in Login:", error.message);
            throw new Error('User login failed');
        } finally {
            // disconnect db
            await dbClient.close();
        }

    }

    static async Logout(userId) {
        try {
            await dbClient.connect();
            // Fetch the user profile from the database
            const userProfile = await User.findById(mongoose.Types.ObjectId.createFromHexString(userId));
            if (!userProfile) {
                return new Error("User not found");
            }
            // set the user profile status to offline
            userProfile.status = "offline";
            await userProfile.save();
            // Close the database connection
            await dbClient.close();
            return userProfile;
        } catch (error) {
            console.error("Error in Logout:", error.message);
            throw new Error('User logout failed');
        }
    }

    static async Profile(userId) {
        try {
            await dbClient.connect();

            // Check if userId is a valid ObjectId
            if (!ObjectId.isValid(userId)) {
              return new Error("Invalid user ID format");
            }

            const userProfile = await User.findById(userId);
            if (!userProfile) {
              return new Error("User profile not found");
            }
            // set the user profile status to online
            userProfile.status = "online";
            await userProfile.save();
            return userProfile;
        } catch (error) {
            console.error("Error in Profile:", error.message);
            return new Error('User profile retrieval failed');
        } finally {
            // disconnect db
            await dbClient.close();
        }
    }

    static async UpdateProfile(userId, obj) {
        try {
            await dbClient.connect();

            // Validate the userId
            if (!ObjectId.isValid(userId)) {
                return new Error("Invalid user ID format");
            }

            // Fetch the user's current profile
            const userProfile = await User.findById(userId);
            if (!userProfile) {
                return new Error("User not found");
            }

            // Validate input data using a Zod schema
            const {success, data} = beProfileUpdateValidator.safeParse(obj);
            if (!success) {
                return new Error("Validation failed");
            }

            // Merge the validated input with the existing profile
            Object.assign(userProfile, data);

            // Add missing fields based on the updated schema
            User.schema.eachPath((path) => {
                if (!userProfile[path] && User.schema.paths[path].defaultValue !== undefined) {
                    // Add missing fields with their default values
                    userProfile[path] = User.schema.paths[path].defaultValue;
                }
            });

            // Save the updated profile
            await userProfile.save();

            return userProfile;
        } catch (error) {
            console.error("Error in UpdateProfile:", error.message);
            throw new Error('User profile update failed');
        } finally {
            // Disconnect from the database
            await dbClient.close();
        }
    }

    static async UpdateAvatar(userId, url) {
        try {
            // Connect to the database
            await dbClient.connect();

            // Fetch the user profile using the userId
            const userProfile = await User.findById(mongoose.Types.ObjectId.createFromHexString(userId));
            if (!userProfile) {
                return new Error("User not found");
            }
            console.log("userProfile", userProfile);
            console.log("url", url);

            // Update the avatar URL
            userProfile.avatar = url;

            // Save the updated profile
            await userProfile.save();

            return userProfile;
        } catch (error) {
            console.error("Error in UpdateAvatar:", error.message);
            throw new Error("Update avatar failed");
        } finally {
            // disconnect db
            await dbClient.close();
        }

    }

}

export default UserController;

// UserController.js