import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Activity {
  id: number;
  title: string;
  description: string;
  type: "offer" | "interview" | "application";
}

const Activities: Activity[] = [
  {
    id: 1,
    title: "Offer received from BigTech Inc",
    description: "2 hours ago",
    type: "offer",
  },
  {
    id: 2,
    title: "Interview scheduled with TechCorp",
    description: "1 day ago",
    type: "interview",
  },
  {
    id: 3,
    title: "Application submitted to StartupXYZ",
    description: "3 days ago",
    type: "application",
  },
];

const RecentActivity = () => {
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
          {Activities.map((activity) => (
            <ActivityItem key={activity.id} {...activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityItem = ({ title, description, type, id }: Activity) => {
  const colorMap: Record<Activity["type"], string> = {
    offer: "bg-green-400",
    interview: "bg-amber-400",
    application: "bg-blue-400",
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
