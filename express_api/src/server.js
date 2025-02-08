import express from "express";
import env from "dotenv";
import userRoute from "./user/routes/user_routes.js";
import bodyParser from "body-parser";
import logger from "./common/utils/logger.js";
import postRoute from "./post/routes/post_route.js";
env.config();

const app = express();
app.use(bodyParser.json());
app.use("/api",userRoute);

app.use("/api",postRoute);

const port = process.env.port || 5000;

app.listen(port,()=>{
    logger.info("server run in port 5000");
});