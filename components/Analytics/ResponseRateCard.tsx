import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResponseRateChart from "@/components/Analytics/ResponseRateChart";

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
