import express from "express";
import { StatusCodes } from "http-status-codes";
import post from "../model/post_db.js";
import logger from "../../common/utils/logger.js";
import token1 from "../../user/model/token.js";
import cloudinary from "../../common/utils/cloud_image.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";


const addPost = express.Router();

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params:{
        folder:'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        public_id: (req, file) => Date.now() + '-' + file.originalname
    }
});

const upload = multer({storage});

addPost.post("/addpost",upload.single('image'), async(req, res)=>{
    const {username, title, description} = req.body;

    const image = req.file ? req.file.path : '';

    if(!title || !username || !description || !image)
    {
        res.status(StatusCodes.BAD_REQUEST).json({message:"title or image or description required"});
        return;
    }

    try
    {
        const isLoggedin = await token1.findOne({username});
        if(!isLoggedin)
        {
            res.status(StatusCodes.NOT_FOUND).json({message:"you are not loggedin"});
            return;
        }

        const titleExist = await post.findOne({username, title});

        if(titleExist)
        {
            res.status(StatusCodes.NOT_ACCEPTABLE).json({message:"Title already exists"});
            return;
        }

        const newpost = new post({
            username,
            title,
            image,
            description
        });

        await newpost.save();
        res.status(StatusCodes.OK).json({message:"Post insert successfully"});
    } 
    catch (error)
    {
        logger.error("Error during posting",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"server error"});    
    }
});

export default addPost;