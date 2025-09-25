"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAppStore } from "@/store/useAppStore";
import { Value } from "@radix-ui/react-select";

const ApplicationDistribution = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status Distribution</CardTitle>
        <CardDescription>
          Breakdown of your applications by current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PieChartComponent />
      </CardContent>
    </Card>
  );
};

export default ApplicationDistribution;

const data = [
  { name: "Applied", value: 45 },
  { name: "Interview", value: 12 },
  { name: "Offer", value: 8 },
  { name: "Rejected", value: 15 },
];
const COLORS = ["#0088FE", "#FFBB28", "green", "red"];

export function PieChartComponent() {
  // const { applications, fetchApplications, getApplicationsGroupedByStatus } =
  //   useAppStore();

  // useEffect(() => {
  //   fetchApplications();
  // }, [fetchApplications]);
  // const groupedApplications = getApplicationsGroupedByStatus();

  // const data = [
  //   { name: "Applied", value: groupedApplications.Applied.length },
  //   { name: "Interview", value: groupedApplications.Interview.length },
  //   { name: "Offer", value: groupedApplications.Offer.length },
  // //   { name: "Rejected", value: groupedApplications.Rejected.length },
  // ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={5}
          dataKey="value"
        >
          {COLORS.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
