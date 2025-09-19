import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import TrendsChart from "./TrendsChart";

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
