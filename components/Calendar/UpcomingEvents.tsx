"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Clock } from "lucide-react";
import EventsCard from "./EventsCard";
// import { Event } from "@/types/Event";
import { useAppStore } from "@/store/useAppStore";

const UpcomingEvents = () => {
  const { events, fetchEvents } = useAppStore();
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-amber-400/10 rounded-lg">
            <Clock className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg">Upcoming Events</h3>
            <p className="text-sm text-muted-foreground">Next 5 events</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* <NoEvents /> */}
        {events.length === 0 && <NoEvents />}
        {events.map((event) => (
          <EventsCard key={event.id} {...event} />
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;

const NoEvents = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="p-4 bg-muted rounded-full">
        <Clock className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          No events or applications
        </p>
        <p className="text-xs text-muted-foreground">
          Click "Add Event" to schedule something
        </p>
      </div>
    </div>
  );
};
