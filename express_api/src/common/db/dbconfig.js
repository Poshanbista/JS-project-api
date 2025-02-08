import mongoose from "mongoose";
import logger from "../utils/logger.js";


export const db_config = ()=>{
    mongoose
.connect('mongodb://localhost:27017/signup_login', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => logger.info('MongoDB connected'))
.catch((err) => logger.error(err));

};

