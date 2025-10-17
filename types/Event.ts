export interface Event {
  _id: string;
  applicationId?: string;
  title: string;
  date: Date;
  type: "interview" | "deadline" | "followup" | "review" | "negotiation";
  company: string;
  position: string;
  duration?: string;
  priority?: "low" | "medium" | "high";
  notes?: string;
}
