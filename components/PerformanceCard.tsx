import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ProgressesList from "./ProgressesList";

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
