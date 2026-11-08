
import mongoose from "mongoose";

const DesignSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },

    length: {
      type: String,
      default: "",
    },

    width: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    appointment: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Completed", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Design =
  mongoose.models.Design ||
  mongoose.model("Design", DesignSchema);

export default Design;
