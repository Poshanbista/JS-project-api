import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { getStatusCode, StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger.js";
import user12 from "../model/user.js";
import { generateAccessToken } from "../utils/jwt_generator.js";
import jwt from "jsonwebtoken";
import token1 from "../model/token.js";
import redisClient from "../../common/db/redis_client.js";

const userlogin = express.Router();

userlogin.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Please enter both username and password." });
    }

    try {

        const idLogin = await token1.findOne({username});
        if(idLogin)
        {
            res.status(StatusCodes.OK).json({message:"already loggedin"});
            return;
        };

        // Check if the user exists
        const user = await user12.findOne({ username });
        if (!user) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Invalid username or password." });
        }

        const email = user.email;

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Invalid password." });
        }

        // Generate tokens
        const jwtPayload = { id: user._id, username: user.username }; // Use user-specific identifiers
        const accessToken = generateAccessToken(jwtPayload);

        const secretRefreshKey = process.env.refresh_key || "default_refresh_secret_key";
        if (!secretRefreshKey) {
            throw new Error("Refresh token key is not defined in environment variables.");
        }

        const refreshToken = jwt.sign(jwtPayload, secretRefreshKey, { expiresIn: "7d" }); // Refresh token valid for 7 days

        const newtoken = new token1({
            username,
            password,
            email
        });

        await newtoken.save();
        res.status(StatusCodes.OK).json({message:"Token data saved successfully."});
        
       /* if(!req.session)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"session not available"});
        }

        req.session.username = username;
        req.session.email = email;

        console.log(req.session);

        res.cookie("username", username, { maxAge: 900000, httpOnly: true });
        res.cookie("email", email, { maxAge: 900000, httpOnly: true });*/

        const redisKey = `user:${username}`;
    
        await redisClient.hSet(redisKey, 
             username,
             email,
             accessToken,
             refreshToken
        );
        
        // Set expiration for Redis data (in seconds, 60 * 60 * 60 = 216000 seconds = 60 hours)
        await redisClient.expire(redisKey, 60 );

    
    } catch (error) {
        logger.error("Error during user login:", error);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Server error. Please try again later.", error: error.message });
    }
});

export default userlogin;
