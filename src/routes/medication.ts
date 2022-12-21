import express from "express";
const router = express.Router();

import { droneLoadingWithMedication } from "../controller/medicationController";
router.post("/loaddrone", droneLoadingWithMedication);

export default router;