"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar1 } from "lucide-react";

export default function CalendarCard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card className="row-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar1 className="h-5 w-5" />
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm"
          captionLayout="dropdown"
        />
      </CardContent>
    </Card>
  );
}
