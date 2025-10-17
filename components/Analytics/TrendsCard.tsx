import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TrendsChart from "@/components/Analytics/TrendsChart";

const TrendsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Application Trends</CardTitle>
        <CardDescription>
          Track your application activity over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TrendsChart />
      </CardContent>
    </Card>
  );
};

export default TrendsCard;
