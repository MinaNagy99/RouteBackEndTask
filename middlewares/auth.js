import userModel from "../DataBase/models/userModel.js";
import { AppError } from "../utilities/AppError.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
export const authRequiered = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new AppError("token not provider", 401));
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) return next(new AppError(err.message));
    const { id } = decoded;
    const user = await userModel.findById(id).select("-password");
    if (!user) return next(new AppError("user not authorized", 401));

    req.user = user;
    next();
  });
});
export const authNotRequired = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) return next(new AppError(err.message));
      const { id } = decoded;
      const user = await userModel.findById(id).select("-password");
      if (!user) return next(new AppError("user not authorized", 401));

      req.user = user;
      next();
    });
  } else {
    next();
  }
});
