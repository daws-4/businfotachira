import { Schema, model, models } from "mongoose";

const unidades = new Schema(
  {
    placa: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    numero: {
      type: Number,
      required: true,
      trim: true,
    },
    nombre_conductor: {
      type: String,
      required: true,
      trim: true,
    },
    ci_conductor:{
      type: Number,
      required: true,
      trim: true
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

export default models.unidades ||
  model("unidades", unidades);
