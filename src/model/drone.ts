import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { MedicationInstance } from "./medications";

interface DronesAttributes {
  id: string;
  serial: string;
  battery: number;
  model: string;
  state?: string;
  weight: number;
  currentWeight?: number;
  token: string;
}

export class DroneInstance extends Model<DronesAttributes> {}

DroneInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    serial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    battery: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "idle",
    },
    weight: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    currentWeight: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
    tableName: "drone",
  }
);

DroneInstance.hasMany(MedicationInstance, {
      foreignKey: "droneId",
  as: "medication",
});

MedicationInstance.belongsTo(DroneInstance, {
  foreignKey: "droneId",
  as: "drone",
});