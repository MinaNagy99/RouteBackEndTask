import userModel from "../../../DataBase/models/userModel.js";
import { catchAsyncError } from "../../../middlewares/catchAsyncError.js";
import { AppError } from "../../../utilities/AppError.js";

const register = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const oldUser = await userModel.findOne({
    email
  });

  if (oldUser) {
    return next(new AppError("user already exists", 400));
  }

  const user = new userModel(req.body);
  await user.save();

  const token = await user.generateToken();
  res.status(200).send({ message: "success", data: user, token });
});

const updateUser = catchAsyncError(async (req, res, next) => {
  const { _id } = req.user;

  const user = await userModel.findByIdAndUpdate(_id, req.body, {
    new: true
  });
  if (!user) {
    return next(new AppError("Failed to update the user", 500));
  }

  res.status(200).json({ message: "success", data: user });
});
const login = catchAsyncError(async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await userModel.findOne({ userName });
  if (!user) return next(new AppError("user not found", 400));
  if (!(await user.comparePassword(password))) {
    return next(new AppError("incorrect name or password"));
  }
  const token = await user.generateToken();
  res.status(200).send({ message: "success", data: user, token });
});

export { register, updateUser, login };
