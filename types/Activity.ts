export interface Activity {
  id: string;
  title: string;
  description: string;
  type: "Offer" | "Interview" | "Applied";
}

export interface ActivityDTO {
  _id: string;
  message: string;
  type: "Offer" | "Interview" | "Applied";
}
