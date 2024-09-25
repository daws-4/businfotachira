import { Schema, model, models } from "mongoose";

const lineas = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: [String],
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      required: true,
      trim: true,
    },
    rol: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
    localidad: {
      type: String,
      required: true,
      trim: true,
    },
  
  },
  {
    timestamps: true,
  }
);

export default models.lineas || model('lineas', lineas);