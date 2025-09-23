"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Application } from "@/types/Application";
import { format } from "date-fns";
import { useAppStore } from "@/store/useAppStore";

const ApplicationCards = () => {
  const { applications, fetchApplications } = useAppStore();

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
      {applications.map((application) => (
        <ApplicationCard
          key={`${application.company}-${application.position}`}
          {...application}
        />
      ))}
    </div>
  );
};

export default ApplicationCards;

export const ApplicationCard = ({
  company,
  position,
  status,
  dateApplied,
  location,
  notes,
}: Application) => {
  const colorMap: Record<Application["status"], string> = {
    Offer: "bg-green-600",
    Interview: "bg-amber-500/90",
    Applied: "bg-blue-500",
    Rejected: "bg-red-600",
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
            <span className="text-xs text-muted-foreground">
              {format(dateApplied, "y-MM-dd")}
            </span>
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
