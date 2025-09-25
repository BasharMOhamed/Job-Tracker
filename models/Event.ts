import mongoose, { Schema } from "mongoose";
const eventSchema = new Schema(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: "Application" },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    type: {
      type: String,
      enum: ["interview", "deadline", "followup", "review", "negotiation"],
      required: true,
    },
    company: { type: String, required: true },
    position: { type: String, required: true },
    duration: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export const EventModel = mongoose.model("Event", eventSchema);
