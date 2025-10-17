import mongoose, { Schema, Document, model } from "mongoose";

export interface Attachment {
  filename: string;
  url: string;
  fileType: string;
  fileSize: number;
  uploadedAt?: Date;
}

export interface Application extends Document {
  company: string;
  position: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  dateApplied: Date;
  responseDate: Date;
  location: string;
  jobLink?: string;
  interviewer?: string;
  interviewDate?: Date;
  interviewType?: "Onsite" | "Remote" | "Phone" | "Other";
  meetingLink?: string;
  notes?: string;
  attachments?: Attachment[];
  createdAt?: Date;
  updatedAt?: Date;
}

const attachmentSchema = new Schema<Attachment>(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    fileType: { type: String },
    fileSize: { type: Number },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const applicationSchema = new Schema<Application>(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      required: true,
    },
    location: { type: String, default: "Cairo, Egypt" },
    dateApplied: { type: Date, required: true },
    responseDate: { type: Date },
    jobLink: { type: String },
    interviewer: { type: String },
    interviewDate: { type: Date },
    interviewType: {
      type: String,
      enum: ["Onsite", "Remote", "Phone", "Other"],
    },
    meetingLink: { type: String },
    notes: { type: String },
    attachments: [attachmentSchema],
  },
  { timestamps: true }
);

export const ApplicationModel =
  mongoose.models.Application ||
  model<Application>("Application", applicationSchema);
