import express from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger.js";
import user12 from "../model/user.js";


const userUpdate = express.Router();


userUpdate.post('/update', async(req, res)=>{
    const {name, username, email, mobile_no} = req.body;

    if(!username)
    {
        res.status(StatusCodes.BAD_REQUEST).json({message:"username required"});
        return;
    }

    try {
        const updateuser = await user12.findOneAndUpdate(
            {username},
            {name, email, mobile_no},
            {new:true}
        );

        if(!updateuser)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"user not found"});
            return;
        }

        res.status(StatusCodes.OK).json({message:"updation successful"});
        res.json({updateuser});
        
    } 
    catch (error)
    {
        logger.error("Error during updation ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"server error"});   
    }

});

export default userUpdate;
