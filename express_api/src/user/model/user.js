import mongoose from 'mongoose'
import autoIncrementID from "mongoose-sequence";
import logger from '../../common/utils/logger.js';

mongoose
.connect('mongodb://localhost:27017/signup_login', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => logger.info('MongoDB connected'))
.catch((err) => logger.error(err));

const userSchema = new mongoose.Schema({
    user_id:{
        type:Number,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile_no:{
        type:Number,
    },
    password:{
        type:String,
        required:true,
    }
});

userSchema.plugin(autoIncrementID(mongoose), { inc_field: 'user_id' });

const user12 = mongoose.models.user12 || mongoose.model("user12", userSchema);

export default user12;
