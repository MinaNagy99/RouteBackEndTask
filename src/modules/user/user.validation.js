import Joi from "joi";

const { userName, email, password } = {
  userName: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]+$'))
    .pattern(new RegExp("(?=.*[a-z])")) // At least one lowercase letter
    .pattern(new RegExp("(?=.*[A-Z])")) // At least one uppercase letter
    .pattern(new RegExp("(?=.*[0-9])")) // At least one digit
    .pattern(new RegExp('(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\|,.<>\\/?])')) // At least one special character
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be less than 30 characters long",
      "string.pattern.base":
        "Password must contain letters, digits, and special characters",
      "string.pattern.name":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    })
};

export const UserSchema = Joi.object({
  userName: userName.required(),
  email: email.required(),
  password: password.required()
});

export const loginSchema = Joi.object({
  userName: userName.required(),
  password: password.required()
});
