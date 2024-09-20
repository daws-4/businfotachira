import { Schema, model, models } from "mongoose";

const defaultHora = new Schema(
  {
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
  }
);

const recorridos = new Schema(
  {
    index: {
      type: Number,
      required: true,
      trim: true,
    },
    nombre:{
      type: String,
      required: true,
      trim: true,
    },
    defaultHora:{
      type: [defaultHora],
    }
  }
)


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
    },
    recorridos: {
      type: [recorridos],
    }
  },
  {
    timestamps: true,
  }
);

export default models.mapa ||
  model("mapa", mapa);
