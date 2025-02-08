import express from "express";
import { StatusCodes } from "http-status-codes";
import token1 from "../model/token.js";
import logger from "../../common/utils/logger.js";


const userLogout = express.Router();

userLogout.post('/logout', async (req, res)=>{
    const {username} = req.body;

    if(!username)
    {
        res.status(StatusCodes.BAD_REQUEST).json({message:"username required"});
        return;
    }

    try 
    {
        const deletetoken = await token1.findOneAndDelete({username});

        if(!deletetoken)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"no active token found for this user"});
            return;
        }

        res.status(StatusCodes.OK).json({message:"logout successful, token deleted"});
    }
     catch (error) 
    {
       logger.error("Error during user logout",error);
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"server logout, logout failed"});
    }
});


export default userLogout;

