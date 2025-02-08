import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (user) => {
    const secretAccessToken = process.env.access_token || "default_secret_access_key";

    if (!secretAccessToken) {
        throw new Error("Access token key is not defined in environment variables.");
    }

    try {
        return jwt.sign(user, secretAccessToken, { expiresIn: "2h" }); // Token valid for 2 hours
    } catch (error) {
        console.error("Error generating access token:", error.message);
        throw new Error("Failed to generate access token.");
    }
};
