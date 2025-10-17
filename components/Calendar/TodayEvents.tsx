"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { useAppStore } from "@/store/useAppStore";
import EventsCard from "./EventsCard";

const TodayEvents = () => {
  const { todaysEvents, fetchTodayEvents } = useAppStore();
  useEffect(() => {
    fetchTodayEvents();
  }, [fetchTodayEvents]);
  const date = new Date();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-green-400/10 rounded-lg">
            <Calendar className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg">{format(date, "EEEE, MMMM d")}</h3>
            <p className="text-sm text-muted-foreground">
              {date.getFullYear()}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {todaysEvents.length === 0 && <NoEvents />}
        {todaysEvents.map((event) => (
          <EventsCard key={event._id} {...event} />
        ))}
      </CardContent>
    </Card>
  );
};

export default TodayEvents;

const NoEvents = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="p-4 bg-muted rounded-full">
        <Calendar className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          No events or applications for this date
        </p>
        <p className="text-xs text-muted-foreground">
          Click "Add Event" to schedule something
        </p>
      </div>
    </div>
  );
};
