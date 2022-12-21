"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const medications_1 = require("./medications");
class DroneInstance extends sequelize_1.Model {
}
exports.DroneInstance = DroneInstance;
DroneInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    serial: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    battery: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "idle",
    },
    weight: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    currentWeight: {
        type: sequelize_1.DataTypes.NUMBER,
        defaultValue: 0,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 0,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "drone",
});
DroneInstance.hasMany(medications_1.MedicationInstance, {
    foreignKey: "droneId",
    as: "medication",
});
medications_1.MedicationInstance.belongsTo(DroneInstance, {
    foreignKey: "droneId",
    as: "drone",
});
//# sourceMappingURL=drone.js.map