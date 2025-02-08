import express from 'express';
import { StatusCodes } from 'http-status-codes';
import nodemailer from "nodemailer";
import crypto from "crypto";
import user12 from '../model/user.js';
import bcrypt from "bcrypt";
import logger from '../../common/utils/logger.js';
import token1 from '../model/token.js';
import dotenv from "dotenv";
dotenv.config();

const forgotPassword = express.Router();


let OTPstore = {};   // Temporary OTP storage

//email transporter setup
const transporter = nodemailer.createTransport({
    service :"gmail",
    auth:{
        user:process.env.email,
        pass:process.env.password
    }
});

//generate secure otp

const generateOTP = async ()=>{
    const otp = crypto.randomInt(100000, 999999).toString();  // generate 6 digit otp
    const newhashedotp = await bcrypt.hash(otp, 10);
    return {otp, newhashedotp};
};

forgotPassword.post("/forgotpassword", async(req, res)=>{
    const{email} = req.body;

    try
    {
        const user = await user12.findOne({email});
        if(!user)
        {
            res.status(StatusCodes.BAD_REQUEST).json({message:"entered email is not registered"});
            return;
        }

        const {otp, newhashedotp} = await generateOTP();
        

        const mailoption = {
            from:"email",
            to:email,
            subject:"Password Reset OTP",
            text:`Your OTP for password reset is ${otp}`
        };   

        await transporter.sendMail(mailoption);
        

        const deleteuser = await token1.findOneAndDelete({email});
        if(!deleteuser)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"email not found"});
            return;
        }


        const isupdate = await user12.findOneAndUpdate(
            { email },
            { password: newhashedotp },
            { new: true }      // Returns the updated document
        );
        

        if(!isupdate)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"email not found"});
            return;
        }
        

        res.json({message:"OTP sent to your email"});
    } 

    catch (error)
    {
        logger.error("Error is sending OTP",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({messsage:"server error"});
    }
});

export default forgotPassword;

