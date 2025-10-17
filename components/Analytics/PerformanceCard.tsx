import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProgressesList from "@/components/Analytics/ProgressesList";

const PerformanceCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Success Metrics</CardTitle>
        <CardDescription>Key performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <ProgressesList />
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
