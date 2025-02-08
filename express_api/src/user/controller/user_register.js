import express from "express";
import bcrypt from "bcrypt";
import user12 from "../model/user.js";
import { StatusCodes } from "http-status-codes";


const userRegister = express.Router();

userRegister.post('/register', async (req, res) => {
    const { name, username, email, mobile_no, password } = req.body;

    if (!name || !username || !email || !password) {
        res.json({ message: "name or username or password or email is required" }, 400)
        //res.send("hello");
        return;
    }

    try {
        const userexist = await user12.findOne({ email });
        if (userexist) {
            res.json({ message: "user already exists" });
            return;
        }

        const hashedpassword = await bcrypt.hash(password,10);

        const newuser = new user12({
            name,
            username,
            email,
            password:hashedpassword,
            mobile_no
        });

        await newuser.save();
        res.status(StatusCodes.OK).json({ message: "data inserted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).json({ message: "server error" });
    }
});

export default userRegister;

