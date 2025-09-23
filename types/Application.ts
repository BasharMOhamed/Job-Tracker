export interface Application {
  id: string;
  company: string;
  position: string;
  jobLink?: string;
  location?: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  dateApplied: Date;
  interviewDate?: Date;
  interviewType?: "Onsite" | "Remote" | "Phone" | "Other";
  interviewer?: string;
  meetingLink?: string;
  notes?: string;
}

export interface AddApplicationFormProps {
  onSubmit: (data: Omit<Application, "id">) => void;
  onCancel: () => void;
}
