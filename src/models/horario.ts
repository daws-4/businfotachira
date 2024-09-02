import { Schema, model, models } from "mongoose";

const horario = new Schema({
  id: {
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
  unidad: {
    type: String,
    required: true,
    trim: true,
  },
  fecha_hora: {
    type: Date,
    required: true,
    trim: true,
},
},
  {
    timestamps: true,
  });

export default models.horario || model("horario", horario);
