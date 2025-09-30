import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      required: true,
    },
  },
  { timestamps: true }
);

export const ActivityModel =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);
