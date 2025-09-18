import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

interface ApplicationCardProps {
  company: string;
  position: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  dateApplied: string;
  location: string;
  notes?: string;
}

const mockApplications: ApplicationCardProps[] = [
  {
    company: "TechCorp",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    status: "Interview",
    dateApplied: "2024-01-15",
    notes:
      "Great company culture, competitive salary. Interview scheduled for next week.",
  },
  {
    company: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Remote",
    status: "Applied",
    dateApplied: "2024-01-12",
    notes: "Early stage startup, equity opportunity.",
  },
  {
    company: "BigTech Inc",
    position: "Software Engineer",
    location: "Seattle, WA",
    status: "Offer",
    dateApplied: "2024-01-08",
    notes: "Excellent benefits package, waiting on decision deadline.",
  },
  {
    company: "DataFlow",
    position: "React Developer",
    location: "Austin, TX",
    status: "Rejected",
    dateApplied: "2024-01-05",
    notes: "Feedback: Looking for more backend experience.",
  },
];

const ApplicationCards = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
      {mockApplications.map((application) => (
        <ApplicationCard
          key={`${application.company}-${application.position}`}
          {...application}
        />
      ))}
    </div>
  );
};

export default ApplicationCards;

const ApplicationCard = ({
  company,
  position,
  status,
  dateApplied,
  location,
  notes,
}: ApplicationCardProps) => {
  const colorMap: Record<ApplicationCardProps["status"], string> = {
    Offer: "bg-green-400",
    Interview: "bg-amber-400",
    Applied: "bg-blue-400",
    Rejected: "bg-danger",
  };
  return (
    <Card className="group cursor-pointer hover:shadow-2xl transition-shadow">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>
          <h2 className="text-xl">{company}</h2>
          <h3 className="text-sm text-muted-foreground">{position}</h3>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            size={"sm"}
            variant="ghost"
            className="opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Badge
            className={`text-white ${colorMap[status]} px-2 py-1 rounded-xl`}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-3 justify-between">
          <div className="flex items-center gap-0.5">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{location}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{dateApplied}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {notes ||
            "Exciting opportunity at a leading tech company. Looking forward to the next steps."}
        </p>
      </CardContent>
    </Card>
  );
};
