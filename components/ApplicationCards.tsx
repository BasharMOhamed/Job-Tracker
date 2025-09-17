import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

const ApplicationCards = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
      <ApplicationCard />
      <ApplicationCard />
      <ApplicationCard />
      <ApplicationCard />
    </div>
  );
};

export default ApplicationCards;

const ApplicationCard = () => {
  return (
    <Card className="group cursor-pointer hover:shadow-2xl transition-shadow">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>
          <h2 className="text-xl">TechCorp</h2>
          <h3 className="text-sm text-muted-foreground">
            Senior Frontend Developer
          </h3>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            size={"sm"}
            variant="ghost"
            className="opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Badge className="text-white bg-purple-600 px-2 py-1 rounded-xl">
            Interview
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-3 justify-between">
          <div className="flex items-center gap-0.5">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              San Franciso, CA
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">2023-08-03</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Great company culture, competitive salary. Interview scheduled for
          next week.
        </p>
      </CardContent>
    </Card>
  );
};
