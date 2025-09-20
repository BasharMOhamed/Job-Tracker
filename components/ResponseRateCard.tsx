import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ResponseRateChart from "./ResponseRateChart";

const ResponseRateCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Rate by Day of Week</CardTitle>
        <CardDescription>
          Optimize your application timing for better response rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponseRateChart />
      </CardContent>
    </Card>
  );
};

export default ResponseRateCard;
