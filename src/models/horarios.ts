import { Schema, model, models } from "mongoose";
const defaultHora = new Schema(
  {
    unidad: {
    type: String,
    trim: true,
  },
    pdr_name: {
    type: String,
    required: true,
    trim: true,
  },
  array_id: {
    type: Number,
    required: true,
    trim: true,
  },
  pdr_id: {
    type: String,
    required: true,
    trim: true,
  },
    hora: {
      type: String,
      required: true,
      trim: true,
    },
    fecha:{
      type: String,
      required: true,
      trim: true,
    },
  }
);

const hor = new Schema({
  index: {
    type: Number,
    required: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  defaultHora: {
    type: [defaultHora],
    required: true,
  }
})

const horarios = new Schema({
 
  linea: {
    type: String,
    required: true,
    trim: true,
  },
  ruta:{
    type: String,
    required: true,
    trim: true,
  },
  recorrido:{
    type: String,
    required: true,
    trim: true,
  },
  fecha:{
    type: String,
    trim: true,
    required: true,
  },
  hor4weeks:{
    type: [hor],
    required: true,
  }
},
  {
    timestamps: true,
  });

export default models.horarios || model("horarios", horarios);
