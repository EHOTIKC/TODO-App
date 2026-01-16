import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: Number,
      min: 1,
      max: 10,
      default: 1,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Todo", todoSchema);

