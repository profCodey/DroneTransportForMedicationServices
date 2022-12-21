"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleDroneWithBatteryPercent = exports.getLoadedMedicationForSingleDrone = exports.getAllDronesForLoading = exports.getBatteryLevelOfSingleDrone = exports.getAllRegisteredDrones = exports.registerDrone = void 0;
const uuid_1 = require("uuid");
const drones_1 = require("../model/drones");
const medications_1 = require("../model/medications");
const sequelize_1 = require("sequelize");
const utils_1 = require("../utils/utils");
async function registerDrone(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.registerDroneSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const duplicateSerial = await drones_1.DroneInstance.findOne({
            where: { serial: req.body.serial },
        });
        if (duplicateSerial) {
            return res.status(409).json({
                error: "Serial number of drone already exist.",
            });
        }
        const duplicateModel = await drones_1.DroneInstance.findOne({
            where: {
                model: req.body.model,
            },
        });
        if (duplicateModel) {
            return res.status(409).json({
                error: "Model number of drone already exist.",
            });
        }
        //  const token = jwt.sign({ id: id }, secret, {expiresIn: "30mins",});
        const token = (0, utils_1.generateToken)({ id: id });
        const droneInfo = await drones_1.DroneInstance.create({
            id,
            ...req.body,
            token,
        });
        res.status(201).json({
            id,
            msg: "Congrats! Drone registration successful",
            droneInfo,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "Drone registration failed",
        });
    }
}
exports.registerDrone = registerDrone;
async function getAllRegisteredDrones(req, res, next) {
    var _a, _b;
    try {
        const limit = (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit;
        const offset = (_b = req.query) === null || _b === void 0 ? void 0 : _b.offset;
        const droneInfo = await drones_1.DroneInstance.findAndCountAll({
            limit,
            offset,
        });
        res.status(200).json({
            msg: "Request successful. Drones fetched successfully",
            count: droneInfo.count,
            droneInfo: droneInfo.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to fetch all drones",
        });
    }
}
exports.getAllRegisteredDrones = getAllRegisteredDrones;
async function getBatteryLevelOfSingleDrone(req, res, next) {
    try {
        const { id } = req.params;
        const droneInfo = await drones_1.DroneInstance.findOne({
            where: { id: id },
        });
        return res.status(200).json({
            msg: "Successfully gotten drone  battery information",
            droneInfo: droneInfo.battery + "%",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single Drone",
        });
    }
}
exports.getBatteryLevelOfSingleDrone = getBatteryLevelOfSingleDrone;
async function getAllDronesForLoading(req, res, next) {
    try {
        const droneInfo = await drones_1.DroneInstance.findAll({
            where: {
                battery: {
                    [sequelize_1.Op.gte]: 25,
                },
                currentWeight: 0,
            },
        });
        res.status(200).json({
            msg: "You have successfully fetch all Drones",
            droneInfo,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
        });
    }
}
exports.getAllDronesForLoading = getAllDronesForLoading;
async function getLoadedMedicationForSingleDrone(req, res, next) {
    try {
        const { id } = req.params;
        const droneInfo = await drones_1.DroneInstance.findOne({
            where: { id: id },
            include: [
                {
                    model: medications_1.MedicationInstance,
                    as: "medication",
                },
            ],
        });
        return res.status(200).json({
            msg: "Successfully gotten drone information",
            droneInfo,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single Drone",
        });
    }
}
exports.getLoadedMedicationForSingleDrone = getLoadedMedicationForSingleDrone;
async function getSingleDroneWithBatteryPercent(req, res, next) {
    try {
        const { id } = req.params;
        const droneInfo = await drones_1.DroneInstance.findOne({
            where: {
                id: id,
            },
        });
        let battery = droneInfo.battery;
        return res.status(200).json({
            msg: "Battery percent request succesfull",
            battery: `${battery} %`,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single Drone",
        });
    }
}
exports.getSingleDroneWithBatteryPercent = getSingleDroneWithBatteryPercent;
//# sourceMappingURL=droneController.js.map