import { Schema, model, models } from "mongoose";



const pdr = new Schema(
  {
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
