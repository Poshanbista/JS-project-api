import express from "express";
import { StatusCodes } from "http-status-codes";
import token1 from "../../user/model/token.js";
import post from "../model/post_db.js";
import logger from "../../common/utils/logger.js";


const viewPost = express.Router();

viewPost.get("/viewpost", async(req, res)=>{
    const {username, title} = req.body;

    const isloggedin = await token1.findOne({username});
    if(!isloggedin)
    {
        res.status(StatusCodes.NOT_FOUND).json({message:"you are not loggedin"});
        return;
    }

    try
    {
        const view_post = await post.findOne({title});
        if(!view_post)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"Post not found"});
        }

        res.json({
            message:"successful",
            userdata:view_post
        });
    }  
    
    catch (error) 
    {
        logger.error("Error in viewing",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"server error"});
    }
});

export default viewPost;