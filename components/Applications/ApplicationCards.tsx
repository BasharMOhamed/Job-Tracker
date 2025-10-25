"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, MoreHorizontal } from "lucide-react";
import { Application } from "@/types/Application";
import { format } from "date-fns";
import { useAppStore } from "@/store/useAppStore";
import { formatFileSize } from "@/utils/helperFunctions";
import ApplicationOptions from "@/components/Applications/ApplicationOptions";

const ApplicationCards = () => {
  const { applications, fetchApplications } = useAppStore();

  return (
    <>
      {applications.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
          {applications.map((application) => (
            <ApplicationCard key={application._id} {...application} />
          ))}
        </div>
      ) : (
        <div className="border-1 rounded-lg bg-muted text-center py-12">
          <h3 className="text-lg font-semibold">No Applications Yet.</h3>
          <p className="text-muted-foreground mt-2">
            Try adding a new application to get started!
          </p>
        </div>
      )}
    </>
  );
};

export default ApplicationCards;

export const ApplicationCard = ({
  _id,
  company,
  position,
  status,
  dateApplied,
  location,
  notes,
  attachments,
}: Application) => {
  const colorMap: Record<Application["status"], string> = {
    Offer: "bg-green-600",
    Interview: "bg-amber-500/90",
    Applied: "bg-blue-500",
    Rejected: "bg-red-600",
  };
  return (
    <Card className="group hover:shadow-2xl transition-shadow select-none">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>
          <h2 className="text-xl">{company}</h2>
          <h3 className="text-sm text-muted-foreground">{position}</h3>
        </CardTitle>
        <div className="flex items-center gap-2">
          <ApplicationOptions
            application={{
              _id,
              company,
              position,
              status,
              dateApplied,
              location,
              notes,
              attachments,
            }}
          />
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
        {attachments?.map((attachment) => (
          <div
            key={attachment.url}
            className="flex justify-between items-center p-2 bg-blue-300/10 rounded-sm my-2"
          >
            <a
              target="_blank"
              href={attachment.url}
              className="text-sm hover:underline underline-offset-4 text-muted-foreground"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            >
              {attachment.filename}
            </a>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(attachment.fileSize)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
