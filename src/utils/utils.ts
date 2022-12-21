import Joi from "joi";
import jwt from "jsonwebtoken";

export const registerDroneSchema = Joi.object().keys({
  serial: Joi.string()
    .regex(/^.{1,100}$/)
    .required(),
  model: Joi.string().required(),
  weight: Joi.number().min(1).max(500).required(),
  battery: Joi.number().required(),
});

export const medicationSchema = Joi.object().keys({
  name: Joi.string().required(),
  code: Joi.string()
    .trim()
    .lowercase()
    .regex(/^[a-zA-Z0-9_.-]*$/)
    .required(),
  image: Joi.string().required(),
  weight: Joi.string().required(),
  droneId: Joi.string().required()
});

//Generate Token
export const generateToken = (user: { [key: string]: unknown }): unknown => {
  const pass = process.env.JWT_SECRET as string;
  return jwt.sign(user, pass, { expiresIn: "7d" });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
