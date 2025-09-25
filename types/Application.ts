export interface Application {
  id: string;
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
}

export interface AddApplicationFormProps {
  onSubmit: (data: Omit<Application, "id">) => void;
  onCancel: () => void;
}
