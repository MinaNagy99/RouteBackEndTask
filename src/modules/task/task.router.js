import { Router } from "express";
import * as task from "./task.controller.js";
import { authNotRequired, authRequiered } from "../../../middlewares/auth.js";
import { validation } from "../../../middlewares/validation.js";
import { createTaskSchema, updateTaskSchema } from "./task.validation.js";
const taskRouter = Router();

taskRouter
  .route("/")
  .get(authNotRequired, task.getAllTasks)
  .post(authRequiered, validation(createTaskSchema), task.createtask);

taskRouter
  .route("/:id")
  .get(authNotRequired, task.gettaskById)
  .delete(authRequiered, task.deletetask)
  .patch(authRequiered, validation(updateTaskSchema), task.updatetask);

export default taskRouter;
