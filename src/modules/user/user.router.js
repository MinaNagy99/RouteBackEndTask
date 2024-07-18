import { Router } from "express";
import * as user from "./user.controller.js";
import { authRequiered } from "../../../middlewares/auth.js";
import { validation } from "../../../middlewares/validation.js";
import { loginSchema, UserSchema } from "./user.validation.js";

const userRouter = Router();

userRouter.route("/register").post(validation(UserSchema), user.register);
userRouter.route("/login").post(validation(loginSchema), user.login);
userRouter.route("/").patch(authRequiered, user.updateUser);

export default userRouter;
