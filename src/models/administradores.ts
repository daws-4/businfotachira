import { Schema, model, models } from "mongoose";

const administradores = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    rol: {
      type: Number,
      default: 1,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.administradores || model('administradores', administradores);