import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResponseTimeChart from "@/components/Analytics/ResponseTimeChart";

const ResponseTimeCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Time Analysis</CardTitle>
        <CardDescription>How long companies take to respond</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponseTimeChart />
      </CardContent>
    </Card>
  );
};

export default ResponseTimeCard;
