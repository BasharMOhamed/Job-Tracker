import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RecommendationItemProps } from "@/types/Recommendation";

const RecommendationsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
        <CardDescription>
          Data-driven suggestions to improve your job search
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RecommendationItem
          title="Optimize Application Timing"
          description="Apply on Tuesday-Thursday for 30% higher response rates"
        />
        <RecommendationItem
          title="Follow Up Strategy"
          description="Send follow-ups after 1 week to increase response rates by 15%"
        />
        <RecommendationItem
          title="Target High-Performance Industries"
          description="Focus on Technology and Finance sectors with 60% higher offer rates"
        />
      </CardContent>
    </Card>
  );
};

const RecommendationItem = ({
  title,
  description,
}: RecommendationItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <span
        style={{ backgroundColor: "hsl(263 70% 65%)" }}
        className={`h-2 w-2 rounded-full`}
      />
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default RecommendationsCard;
