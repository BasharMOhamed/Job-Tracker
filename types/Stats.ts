export interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export interface WeeklyStat {
  day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  applications: number;
  responses: number;
  responseRate: 0;
}

export interface MonthlyStat {
  month:
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec";
  applications: number;
  interviews: number;
  offers: number;
}

export interface ApplicationsStats {
  Applied: number;
  Interview: number;
  Offer: number;
  Rejected: number;
}

export interface ResponseTimeStat {
  range:
    | "0-3 days"
    | "4-7 days"
    | "1-2 weeks"
    | "2-4 weeks"
    | "1+ month"
    | "No response";
  count: number;
}
