import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { DroneInstance } from "../model/drones";
import { MedicationInstance } from "../model/medications";
import { Op } from "sequelize";

import {
  registerDroneSchema,
  generateToken,
  options,

} from "../utils/utils";
export async function registerDrone(
  req: Request | any,
  res: Response,
  next: NextFunction
  ) {
    const id = uuidv4();
    try {
      const validationResult = registerDroneSchema.validate(req.body, options);
      if (validationResult.error) {
        return res.status(400).json({
          Error: validationResult.error.details[0].message,
        });
      }
      const duplicateSerial = await DroneInstance.findOne({
        where: { serial: req.body.serial },
      });
      if (duplicateSerial) {
        return res.status(409).json({
          error: "Serial number of drone already exist.",
        });
      }
      const duplicateModel = await DroneInstance.findOne({
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
      const token = generateToken({ id: id });
      const droneInfo = await DroneInstance.create({
        id,
        ...req.body,
        token,
      });

      res.status(201).json({
        id,
        msg: "Congrats! Drone registration successful",
        droneInfo,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Drone registration failed",
      });
    }
}
  
export async function getAllRegisteredDrones(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const droneInfo = await DroneInstance.findAndCountAll({
      limit,
      offset,
    });
    res.status(200).json({
      msg: "Request successful. Drones fetched successfully",
      count: droneInfo.count,
      droneInfo: droneInfo.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to fetch all drones",
    });
  }
}

export async function getBatteryLevelOfSingleDrone(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const droneInfo = await DroneInstance.findOne({
      where: { id: id },
    });

    return res.status(200).json({
      msg: "Successfully gotten drone  battery information",
      droneInfo: droneInfo.battery + "%",
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single Drone",
    });
  }
}

export async function getAllDronesForLoading(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const droneInfo = await DroneInstance.findAll({
      where: {
        battery: {
          [Op.gte]: 25,
        },
        currentWeight: 0,
      },
    });
    res.status(200).json({
      msg: "You have successfully fetch all Drones",
      droneInfo,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
    });
  }
}

export async function getLoadedMedicationForSingleDrone(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const droneInfo = await DroneInstance.findOne({
      where: { id: id },
      include: [
        {
          model: MedicationInstance,
          as: "medication",
        },
      ],
    });
    return res.status(200).json({
      msg: "Successfully gotten drone information",
      droneInfo,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single Drone",
    });
  }
}

export async function getSingleDroneWithBatteryPercent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const droneInfo = await DroneInstance.findOne({
      where: {
        id: id,
      },
    });
    let battery: any | any = droneInfo.battery;

    return res.status(200).json({
      msg: "Battery percent request succesfull",
      battery: `${battery} %`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single Drone",
    });
  }
}




