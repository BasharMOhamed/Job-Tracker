"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useStatsStore } from "@/store/useStatsStore";

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
  const { applicationsStats, fetchAppsStats } = useStatsStore();
  useEffect(() => {
    fetchAppsStats();
  }, [fetchAppsStats]);

  const data = Object.entries(applicationsStats).map(([key, value]) => ({
    name: key,
    value,
  }));
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
