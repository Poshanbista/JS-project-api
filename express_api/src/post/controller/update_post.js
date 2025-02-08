import express from "express";
import { StatusCodes } from "http-status-codes";
import token1 from "../../user/model/token.js";
import logger from "../../common/utils/logger.js";
import post from "../model/post_db.js";



const updatePost = express.Router();

updatePost.put("/updatepost", async (req, res) => {
    const { username, title, description } = req.body;
    
    try {
        const isLoggedin = await token1.findOne({ username });
        if (!isLoggedin) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "you are not loggedin" });
            return;
        }

        const postexist = await post.findOne({title});
        if (!postexist) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "post not found" });
            return;
        }

        const postupdate = await post.findOneAndUpdate(
            {title},
            { description },
            { new: true }
        );

        if (!postupdate) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Post not found" });
            return;
        }

       res.status(StatusCodes.OK);
       res.json({postupdate});
    }

    catch (error) {
        logger.error("error in updation a post", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "serer error" });
    }

});

export default updatePost;