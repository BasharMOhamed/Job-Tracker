"use client";
import { useAppStore } from "@/store/useAppStore";
import { prepareWeeklyResponseData } from "@/utils/analytics";
import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const weeklyResponseData = [
//   { day: "Monday", applications: 15, responses: 4, responseRate: 27 },
//   { day: "Tuesday", applications: 18, responses: 7, responseRate: 39 },
//   { day: "Wednesday", applications: 12, responses: 5, responseRate: 42 },
//   { day: "Thursday", applications: 14, responses: 6, responseRate: 43 },
//   { day: "Friday", applications: 8, responses: 2, responseRate: 25 },
//   { day: "Saturday", applications: 3, responses: 0, responseRate: 0 },
//   { day: "Sunday", applications: 5, responses: 1, responseRate: 20 },
// ];

const ResponseRateChart = () => {
  const { applications, fetchApplications } = useAppStore();
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);
  const weeklyResponseData = prepareWeeklyResponseData(applications);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={weeklyResponseData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="day"
          angle={-30}
          textAnchor="end"
          className="text-sm"
          height={60}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke="oklch(0.627 0.265 303.9)"
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="oklch(0.705 0.015 286.067)"
        />
        <Tooltip
          contentStyle={{
            background: "oklch(0.21 0.006 285.885)",
            border: "1px solid oklch(1 0 0 / 10%)",
            borderRadius: "8px",
          }}
          formatter={(value, name) => [
            name === "applications"
              ? `${value} applications`
              : name === "responses"
              ? `${value} responses`
              : `${value}%`,
            name === "applications"
              ? "Applications"
              : name === "responses"
              ? "Responses"
              : "Response Rate",
          ]}
        />
        <Legend
          formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
        />
        <Bar
          yAxisId="left"
          dataKey="responses"
          fill="oklch(0.627 0.265 303.9)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          yAxisId="right"
          dataKey="applications"
          fill="oklch(0.705 0.015 286.067)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResponseRateChart;
