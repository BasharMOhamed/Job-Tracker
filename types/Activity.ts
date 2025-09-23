export interface Activity {
  id: number;
  title: string;
  description: string;
  type: "offer" | "interview" | "application";
}
