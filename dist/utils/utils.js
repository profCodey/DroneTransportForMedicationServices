"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.medicationSchema = exports.registerDroneSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerDroneSchema = joi_1.default.object().keys({
    serial: joi_1.default.string()
        .regex(/^.{1,100}$/)
        .required(),
    model: joi_1.default.string().required(),
    weight: joi_1.default.number().min(1).max(500).required(),
    battery: joi_1.default.number().required(),
});
exports.medicationSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    code: joi_1.default.string()
        .trim()
        .lowercase()
        .regex(/^[a-zA-Z0-9_.-]*$/)
        .required(),
    image: joi_1.default.string().required(),
    weight: joi_1.default.string().required(),
    droneId: joi_1.default.string().required()
});
//Generate Token
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
//# sourceMappingURL=utils.js.map