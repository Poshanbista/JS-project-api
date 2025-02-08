import express from "express";
import addPost from "../controller/add_post.js";
import updatePost from "../controller/update_post.js";
import deletePost from "../controller/delete_post.js";
import viewPost from "../controller/view_post.js";


const postRoute = express.Router();

postRoute.use("/post",addPost);
postRoute.use("/post",updatePost);
postRoute.use("/post",deletePost);
postRoute.use("/post",viewPost);


export default postRoute;