import { Schema, model, models } from "mongoose";

const precios = new Schema(
  {
    Monto_USD: {
      type: String,
      required: true,
      trim: true,
    },
    Monto_COP: {
      type: String,
      required: true,
      trim: true,
    },
    Monto_BSD: {
      type: String,
      required: true,
      trim: true,
    },
    distancia: {
      type: Number,
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

export default models.precios || model("precios", precios);
