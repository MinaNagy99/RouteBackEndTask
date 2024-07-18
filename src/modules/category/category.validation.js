import joi from "joi";

const { name, id } = {
  id: joi.string().hex().length(24),
  name: joi.string().min(2).max(50)
};

export const createCategorySchema = joi.object({
  name: name.required()
});

export const categorySchema = joi.object({
  name: name,
  id: id.required()
});
