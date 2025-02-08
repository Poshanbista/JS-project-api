import express from "express";
import { StatusCodes } from "http-status-codes";
import user12 from "../model/user.js";
import logger from "../../common/utils/logger.js";


const viewRegister = express.Router();
viewRegister.get("/viewregisteruser", async(req, res)=>{
    
    try 
    {
        const viewregister = await user12.find(); 
        if(!viewregister)
        {
            res.status(StatusCodes.BAD_REQUEST).json({message:"NO one is register"});
        }
        
       res.json({
        message:"successful",
        userdate : viewregister
       });
    } 
    
    catch (error) 
    {
        logger.error("Error in fetching users",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"server error"});
    }
});

export default viewRegister;