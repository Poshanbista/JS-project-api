import mongoose from "mongoose";
import { db_config } from "../../common/db/dbconfig.js";
import autoIncrementID from "mongoose-sequence";

const postSchema = new mongoose.Schema({
    post_id:{
        type:Number,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    description:{
        type:String,
        required:true
    }
});

postSchema.plugin(autoIncrementID(mongoose),{inc_field:'post_id'});

const post = mongoose.models.post || mongoose.model("post",postSchema);

export default post;

