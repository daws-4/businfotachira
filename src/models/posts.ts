import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const posts = new Schema(
  {
    url: {
      type: String,
      trim: true,
    },
    linea: {
      type: String,
      required: true,
      trim: true,
    },
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    texto: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.posts || model("posts", posts);
