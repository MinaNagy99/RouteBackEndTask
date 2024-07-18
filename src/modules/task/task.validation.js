import Joi from "joi";

export const createTaskSchema = Joi.object({
  list: Joi.array()
    .items(
      Joi.string().min(2).max(2000).messages({
        "string.min": "text body must be more than 2 letters",
        "string.max": "text body must be less than 2000 letters"
      })
    )
    .when("type", {
      is: "list",
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),
  textBody: Joi.string()
    .min(2)
    .max(2000)
    .messages({
      "string.min": "text body must be more than 2 letters",
      "string.max": "text body must be less than 2000 letters"
    })
    .when("type", {
      is: "text",
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),
  type: Joi.string().valid("text", "list").required(),
  visible: Joi.boolean().required(),
  category: Joi.string().hex().length(24).required(),
  createdBy: Joi.string().hex().length(24).required()
});

export const updateTaskSchema = Joi.object({
  list: Joi.array()
    .items(
      Joi.string().min(2).max(2000).messages({
        "string.min": "text body must be more than 2 letters",
        "string.max": "text body must be less than 2000 letters"
      })
    )
    .when("type", {
      is: "list",
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),
  textBody: Joi.string()
    .min(2)
    .max(2000)
    .messages({
      "string.min": "text body must be more than 2 letters",
      "string.max": "text body must be less than 2000 letters"
    })
    .when("type", {
      is: "text",
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),
  type: Joi.string().valid("text", "list").required(),
  visible: Joi.boolean(),
  category: Joi.string().hex().length(24),
  id: Joi.string().hex().length(24)
});
