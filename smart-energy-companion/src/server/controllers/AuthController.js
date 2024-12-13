import crypto from 'crypto';
import util from "tweetnacl-util"
import nacl from "tweetnacl";

class AuthController {

    // Function to hash a password using bcryptjs
    static async hashPassword(password) {
        try {
            const bcryptjs = require("bcryptjs");
            const salt = await bcryptjs.genSalt(10);
            return await bcryptjs.hash(password, salt);
        } catch (error) {
            console.error("Error hashing password:", error.message);
            throw new Error("Password hashing failed");
        }
    }

    // Function to compare a plain text password with a hashed password
    static async comparePassword(plainPassword, hashedPassword) {
        try {
            const bcryptjs = require("bcryptjs");
            const isMatch = await bcryptjs.compare(plainPassword, hashedPassword);
            return isMatch;
        } catch (error) {
            console.error("Error comparing passwords:", error.message);
            throw new Error("Password comparison failed");
        }
    }

    static async headlessCheck(request) {
        try {
            const authHeader = request.headers.get("Authorization");
            if (!authHeader) {
                return new Error("No Authorization header found");
            }
            const encryptedId = authHeader.split(" ")[1]
            if (!encryptedId) {
                return new Error("Invalid Authorization header");
            }
            const userId = await AuthController.decryptedCredentials(encryptedId);
            if (!userId) {
                return new Error("Invalid user ID");
            }
            return userId;
        } catch (error) {
            console.error(error);
            throw new Error("Unauthorized");
        }

    }

    // Function to decrypt data (AES-GCM decryption) for Password and login operations adn userID
    static async decryptedCredentials(encryptedData) {
        const rawKey = process.env.DECRYPT_PRIVATE_KEY;
        try {
            const buffer = Buffer.from(encryptedData, 'base64');
            const decrypted = crypto.privateDecrypt({
                    key: rawKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256",
                },
                buffer
            );
            const jsonString = decrypted.toString('utf8');
            // Parse the JSON string
            return JSON.parse(jsonString);
        } catch (error) {
            console.error("Decryption error:", error);
            throw error;
        }
    }

    // Load private key from environment (ensure open ssl 64 rand)
    static async decryptData(encryptedData, nonce, privateKeyBase64, publicKeyBase64) {
        const privateKey = util.decodeBase64(privateKeyBase64);
        const publicKey = util.decodeBase64(publicKeyBase64);
        const message = util.decodeBase64(encryptedData);
        const nonceUint8 = util.decodeBase64(nonce);

        const decryptedMessage = nacl.box.open(message, nonceUint8, publicKey, privateKey);
        if (!decryptedMessage) {
          throw new Error("Decryption failed.");
        }

        return JSON.parse(util.encodeUTF8(decryptedMessage));
    }

}

export default AuthController;