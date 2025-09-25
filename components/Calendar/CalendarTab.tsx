import React from "react";
import CalendarCard from "./CalendarCard";
import UpcomingEvents from "./UpcomingEvents";
import TodayEvents from "./TodayEvents";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { AddEventDialog } from "./AddEventDialog";

const CalendarTab = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-3xl font-bold ">Interview Calendar</h2>
        <AddEventDialog>
          <Button className="bg-gradient-primary text-white">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </AddEventDialog>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4 items-start">
        <UpcomingEvents />
        <TodayEvents />
      </div>
    </>
  );
};

export default CalendarTab;
