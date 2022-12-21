"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class MedicationInstance extends sequelize_1.Model {
}
exports.MedicationInstance = MedicationInstance;
MedicationInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
    },
    weight: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    droneId: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "medication",
});
//# sourceMappingURL=medication.js.map