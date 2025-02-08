import express from "express";
import { StatusCodes } from "http-status-codes";
import user12 from "../model/user.js";
import logger from "../../common/utils/logger.js";


const userdelete = express.Router();

userdelete.post('/delete', async(req, res)=>{
    const{username} =req.body;

    if(!username)
    {
        res.status(StatusCodes.BAD_REQUEST).json({message:"username required"});
        return;
    }

    try 
    {
        const deleteuser = await user12.findOneAndDelete({username});


        if(!deleteuser)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"user not found"});
        }

        res.status(StatusCodes.OK).json({message:"user delete successfully"});
    }
    catch (error) 
    {
        logger.error("Error during deletation",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Server error"});
    }
});

export default userdelete;