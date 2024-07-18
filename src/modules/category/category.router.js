import { Router } from "express";
import * as category from "./category.controller.js";
import { authRequiered } from "../../../middlewares/auth.js";
import { validation } from "../../../middlewares/validation.js";
import { categorySchema, createCategorySchema } from "./category.validation.js";
const categoryRouter = Router();

categoryRouter
  .route("/")
  .get(category.getAllcategory)
  .post(
    authRequiered,
    validation(createCategorySchema),
    category.createCategory
  );

categoryRouter
  .route("/:id")
  .get(validation(categorySchema), category.getcategoryById)
  .delete(authRequiered, validation(categorySchema), category.deleteCategory)
  .patch(authRequiered, validation(categorySchema), category.updateCategory);

export default categoryRouter;
