import express from "express";
import { StatusCodes } from "http-status-codes";;
import bcrypt from "bcrypt";
import token1 from "../model/token.js";
import user12 from "../model/user.js";
import logger from "../../common/utils/logger.js";



const changePassword = express.Router();

changePassword.post("/changepassword", async (req, res) => {
    const { email, oldpassword, newpassword, confirmpassword } = req.body;

    if (!email || !oldpassword || !newpassword || !confirmpassword) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "email or oldpassword or newpassword or cpassword is required" });
        return;
    }

    if (newpassword !== confirmpassword) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "not same " });
        return;
    }

    try {
        const oldhashedpassword = await bcrypt.hash(oldpassword, 10);
       const user = await user12.findOne({ email });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "password not found" });
            return;
        }
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        const isPasswordmatch = await bcrypt.compare( oldpassword, user.password);
        if (!isPasswordmatch) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "old password don't match." });
        }

        const deleteuser = await token1.findOneAndDelete({email });
        if (!deleteuser) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "user not found" });
            return;
        }

        const updatepassword = await user12.findOneAndUpdate(
            {email},
            { password: hashedPassword },
            { new: true }
        );

        if (!updatepassword) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "email not found" });
            return;
        }

        res.status(StatusCodes.OK).json({ message: "changed password" });
    }

    catch (error) {
        logger.error("error in change password", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "server error" });
    }
});

export default changePassword;