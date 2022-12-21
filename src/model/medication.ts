import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface MedicationAttribute {
  id: string;
  name: string;
  image: string;
  code: string;
  weight: string;
  droneId: string; 
}


export class MedicationInstance extends Model<MedicationAttribute> {}
MedicationInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    droneId: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "medication",
  }
);