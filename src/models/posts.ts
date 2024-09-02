import { Schema, model, models } from "mongoose";

const posts = new Schema(
  {
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
