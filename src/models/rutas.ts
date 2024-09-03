import { Schema, model, models } from "mongoose";

const rutas = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    linea: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.rutas || model("rutas", rutas);
