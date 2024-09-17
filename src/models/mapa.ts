import { Schema, model, models } from "mongoose";


const polilyne = new Schema(
  {
    id:{
      type: Number,
      trim: true,
      default:-64.44807700000001
    },
    lat: {
      type: Number,
      required: true,
      trim: true,
      default:7.770603
    },
    lng: {
      type: Number,
      required: true,
      trim: true,
      default:-72.21868
    },
  }
)

const pdr = new Schema(
  {
    id:{
      type: Number,
      required: true,
      trim: true,
    },
    lat:{
      type: Number,
      required: true,
      trim: true,
    },
    lng:{
      type: Number,
      required: true,
      trim: true,
    },
    nombre:{
      type: String,
      required: true,
      trim: true,
    },
  }
)

const mapa = new Schema(
  {
    nombre:{
      type: String,
      required: true, 
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
      type: [pdr],
      },
    polilyne: {
      type: [polilyne],
    }
  },
  {
    timestamps: true,
  }
);

export default models.mapa ||
  model("mapa", mapa);
