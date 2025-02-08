import express from "express";
import { StatusCodes } from "http-status-codes";
import token1 from "../../user/model/token.js";
import logger from "../../common/utils/logger.js";
import post from "../model/post_db.js";


const deletePost = express.Router();

deletePost.delete("/deletepost", async(req, res)=>{
    const{username, title} = req.body;
    const isloggedin = await token1.findOne({username});
        if(!isloggedin)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"you are not loggedin"});
            return;
        }

    try {
        

        const deletepost = await post.findOneAndDelete({title});

        if(!deletepost)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"post not found"});
            return;
        }

        res.status(StatusCodes.OK).json({message:"delete post successfully"});
    } 
    
    catch (error)
    {
        logger.error("Error in deletation",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"server error"});
    }

});

export default deletePost;