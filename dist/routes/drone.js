"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const droneController_1 = require("../controller/droneController");
router.post("/register", droneController_1.registerDrone);
router.get("/read/:id", droneController_1.getLoadedMedicationForSingleDrone);
router.get("/dronebatterypercent/:id", droneController_1.getSingleDroneWithBatteryPercent);
router.get("/allregistereddrones", droneController_1.getAllRegisteredDrones);
router.get("/allloadingdrones", droneController_1.getAllDronesForLoading);
router.get("/batterylevel/:id", droneController_1.getBatteryLevelOfSingleDrone);
exports.default = router;
//# sourceMappingURL=drone.js.map