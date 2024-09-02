import { Schema, model, models } from "mongoose";

const mapa = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
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
    pdr: {
      type: [String],
      required: true,
      trim: true,
      validate: {
        validator: function (v: string[]) {
          return v.every((phone) => typeof phone === "string");
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

export default models.mapa ||
  model("mapa", mapa);
