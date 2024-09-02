import { Schema, model, models } from "mongoose";

const pdr = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    ubicacion_url: {
      type: String,
      required: true,
      trim: true,
    },
    linea: {
      type: String,
      required: true,
      trim: true,
    },
    ruta: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.pdr || model("pdr", pdr);
