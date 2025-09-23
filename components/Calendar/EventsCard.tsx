import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Event } from "@/types/Event";

const EventsCard = ({ title, type, company, date, duration }: Event) => {
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "interview":
        return "bg-blue-400";
      case "deadline":
        return "bg-destructive";
      case "followup":
        return "bg-amber-400";
      case "review":
        return "bg-primary";
      case "negotiation":
        return "bg-green-400";
      default:
        return "bg-muted";
    }
  };

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case "interview":
        return "Interview";
      case "deadline":
        return "Deadline";
      case "followup":
        return "Follow-up";
      case "review":
        return "Review";
      case "negotiation":
        return "Negotiation";
      default:
        return "Event";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "interview":
        return "👨‍💻";
      case "deadline":
        return "⏰";
      case "followup":
        return "📞";
      case "review":
        return "📋";
      case "negotiation":
        return "💰";
      default:
        return "📅";
    }
  };
  return (
    <Card className="py-3.5">
      {/* <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader> */}
      <CardContent className="flex items-start gap-4 px-4">
        <div className={`p-3 ${getEventTypeColor(type)} rounded-xl`}>
          {getEventTypeIcon(type)}
        </div>
        <div className="flex justify-between items-start flex-1">
          <div>
            <h3 className="text-lg mb-1 font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mb-1">{company}</p>
            <p className="text-xs text-muted-foreground">
              Sep 23, 10:00 AM . 30 minutes
            </p>
          </div>
          <Badge
            variant={"outline"}
            className="text-xs border-primary/20 bg-primary/5"
          >
            {getEventTypeBadge(type)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
