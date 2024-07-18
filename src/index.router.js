import { AppError } from "../utilities/AppError.js";
import userRouter from "./modules/user/user.router.js";
import taskRouter from "./modules/task/task.router.js";
import categoryRouter from "./modules/category/category.router.js";

function init(app) {
  app.use("/api/user", userRouter);
  app.use("/api/task", taskRouter);
  app.use("/api/category", categoryRouter);

  app.all("*", (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
  });
}

export default init;
