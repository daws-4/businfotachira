import { Schema, model, models } from "mongoose";

const horarios = new Schema({
  fecha_hora: {
    type: Number,
    required: true,
    trim: true,
},
  pdr_id:{
  type: Number,
  required: true,
  trim: true,
},  
})

const horario = new Schema({
    unidad: {
    type: String,
    trim: true,
  },
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
    type: Date,
    required: true,
    trim: true,
  },
  horarios:{
    type: [horarios],
  }
},
  {
    timestamps: true,
  });

export default models.horario || model("horario", horario);
