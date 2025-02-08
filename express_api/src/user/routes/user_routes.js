import express from "express";
import userRegister from "../controller/user_register.js";
import userlogin from "../controller/user_login.js";
import userLogout from "../controller/user_logout.js";
import userUpdate from "../controller/user_update.js";
import userdelete from "../controller/user_delete.js";
import viewUser from "../controller/view_login_user.js";
import viewRegister from "../controller/view_register.js";
import forgotPassword from "../controller/forgot_password.js";
import changePassword from "../controller/change_password.js";


const userRoute = express.Router();

userRoute.use("/user",userRegister);
userRoute.use("/user",userlogin);
userRoute.use("/user",userLogout);
userRoute.use("/user",userUpdate);
userRoute.use("/user",userdelete);
userRoute.use("/user",viewUser);
userRoute.use("/user",viewRegister);
userRoute.use("/user",forgotPassword);
userRoute.use("/user",changePassword);

export default userRoute;