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
      type: [Number],
      required: true,
      trim: true,
      validate: {
        validator: function (v: number[]) {
          return v.every((phone) => typeof phone === "number");
        },
      },
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
  },
  {
    timestamps: true,
  }
);

export default models.lineas || model('lineas', lineas);