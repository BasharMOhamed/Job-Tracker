"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "@/types/Activity";
import { useAppStore } from "@/store/useAppStore";
const RecentActivity = () => {
  const { activities, getActivities } = useAppStore();
  useEffect(() => {
    getActivities();
  }, [getActivities]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest job application updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <ActivityItem
              key={activity._id}
              type={activity.type}
              title={activity.message}
              description={"2 days ago"}
              id={activity._id}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityItem = ({ title, description, type }: Activity) => {
  const colorMap: Record<Activity["type"], string> = {
    Offer: "bg-green-400",
    Interview: "bg-amber-400",
    Applied: "bg-blue-400",
  };

  return (
    <div className="flex items-center gap-3">
      <span className={`h-2 w-2 ${colorMap[type]} rounded-full`} />
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default RecentActivity;
