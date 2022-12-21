import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { DroneInstance } from "../model/drone";
import { MedicationInstance } from "../model/medication";
import { medicationSchema, options } from "../utils/utils";

export async function droneLoadingWithMedication(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validate = medicationSchema.validate(req.body, options);
    if (validate.error) {
      return res.status(400).json({
        Error: validate.error.details[0].message,
      });
    }
    const currentlyExits = await MedicationInstance.findOne({
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
    const registeredDrone = await DroneInstance.findOne({
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
        message:
          "Weight ihas exceed the weight limit fot this drone",
        "weight allowed": `${weights} Gr`,
      });
    }
    //update drone state

    await registeredDrone?.update({
      state: "Loaded",
    });

    const info = await MedicationInstance.create({
      id,
      ...req.body,
    });
    res.status(201).json({
      msg: "Drone has been loaded with medication items",
      info,
    });
  } catch (err) {
    res.status(500).json({
      msg: "failed to create"
    });
  }
}
