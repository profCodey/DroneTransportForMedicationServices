"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingDroneWithMedicationItems = void 0;
const uuid_1 = require("uuid");
const drone_1 = require("../model/drone");
const medication_1 = require("../model/medication");
const utils_1 = require("../utils/utils");
async function loadingDroneWithMedicationItems(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validate = utils_1.medicationSchema.validate(req.body, utils_1.options);
        if (validate.error) {
            return res.status(400).json({
                Error: validate.error.details[0].message,
            });
        }
        const currentlyExits = await medication_1.MedicationInstance.findOne({
            where: {
                code: req.body.code,
            },
        });
        if (currentlyExits) {
            return res.status(409).json({
                error: "medication code already exists",
            });
        }
        const { droneId, weight } = req.body;
        const registeredDrone = await drone_1.DroneInstance.findOne({
            where: {
                id: droneId,
            },
        });
        if (!registeredDrone) {
            return res
                .status(401)
                .json({ error: "validation error. drone not found" });
        }
        const weights = registeredDrone.weight;
        const batteryPercent = registeredDrone.battery;
        if (batteryPercent < 25) {
            return res.status(401).json({
                message: "Battery percent of drone is less than 25",
                battery: `${batteryPercent}%`,
            });
        }
        if (weight < weights) {
            return res.status(401).json({
                message: "Weight is greater than the maximum allowed value for this drone",
                "allowed weight": `${weights} Gr`,
            });
        }
        //update drone state
        await (registeredDrone === null || registeredDrone === void 0 ? void 0 : registeredDrone.update({
            state: "Loaded",
        }));
        const info = await medication_1.MedicationInstance.create({
            id,
            ...req.body,
        });
        res.status(201).json({
            msg: "Drone has been loaded with medication items",
            info,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "failed to create"
        });
    }
}
exports.loadingDroneWithMedicationItems = loadingDroneWithMedicationItems;
//# sourceMappingURL=medicationController.js.map