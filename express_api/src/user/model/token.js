import mongoose from "mongoose";
import logger from "../../common/utils/logger.js";

mongoose
.connect('mongodb://localhost:27017/signup_login', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>logger.info("mongod token schema connected"))
.catch(()=>logger.error(err));

const tokenSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true
    }
});

const token1 = mongoose.models.token1 || mongoose.model('token1',tokenSchema);

export default token1;