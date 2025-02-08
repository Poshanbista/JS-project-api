import express from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../../common/utils/logger.js";
import user12 from "../model/user.js";
import token1 from "../model/token.js";



const viewUser = express.Router();

viewUser.get('/viewuser', async(req, res)=>{
    const {username} = req.body;

    if(!username)
    {
        res.status(StatusCodes.BAD_REQUEST).json({message:"username required"});
        return;
    }

    try 
    {
       const view_user = await token1.findOne({username});
        if(!view_user)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"You are not loggedin"});
            return;   
        } 

        const view_user1 = await user12.findOne({username});
        if(!view_user1)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"you are not register"});
            return;   
        }

        res.json({ 
            message:"successful",
            userdata:view_user1
        });

    } 
    catch (error) 
    {
        logger.error("Error in viewing",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"server error"});
    }
});

export default viewUser;