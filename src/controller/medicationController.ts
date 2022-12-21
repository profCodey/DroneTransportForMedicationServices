import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { DroneInstance } from "../model/drones";
import { MedicationInstance } from "../model/medications";
import { createMedicationSchema, options } from "../utils/utils";

