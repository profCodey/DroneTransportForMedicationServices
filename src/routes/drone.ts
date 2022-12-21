import express from "express";
const router = express.Router();


import {
  registerDrone,
  getAllRegisteredDrones,
  getLoadedMedicationForSingleDrone,
  getAllDronesForLoading,
  getSingleDroneWithBatteryPercent,
  getBatteryLevelOfSingleDrone,
} from "../controller/droneController";

router.post("/register", registerDrone);
router.get("/read/:id", getLoadedMedicationForSingleDrone);
router.get("/dronebatterypercent/:id", getSingleDroneWithBatteryPercent);
router.get("/allregistereddrones", getAllRegisteredDrones);
router.get("/allloadingdrones", getAllDronesForLoading);
router.get("/batterylevel/:id", getBatteryLevelOfSingleDrone);


export default router;