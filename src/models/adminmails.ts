import { Schema, model, models } from "mongoose";

const adminmails = new Schema(
  {
    alias:{
      type: String,
      trim: true,
    },
    cedula_identidad: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mensaje: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

export default models.adminmails || model("adminmails", adminmails);
