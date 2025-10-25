export interface Application {
  _id: string;
  company: string;
  position: string;
  jobLink?: string;
  location?: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  dateApplied: Date;
  attachments: Attachment[];
  dateResponded?: Date;
  interviewDate?: Date;
  offerDate?: Date;
  rejectionDate?: Date;
  interviewType?: "Onsite" | "Remote" | "Phone" | "Other";
  interviewer?: string;
  meetingLink?: string;
  notes?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

interface Attachment {
  filename: string;
  url: string;
  fileType: string;
  fileSize: number;
  public_id: string;
}

export interface AddApplicationFormProps {
  handleOpenAndClose: () => void;
  application?: Application;
}
