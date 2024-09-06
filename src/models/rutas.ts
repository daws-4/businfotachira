import { Schema, model, models } from "mongoose";

const rutas = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    localidad: { 
      type: Number,
      required: true,
      trim: true,
      default: 0,
     },
    linea: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

export default models.rutas || model("rutas", rutas);
