"use client";
import { useAppStore } from "@/store/useAppStore";
import { prepareResponseTimeData } from "@/utils/analytics";
import React, { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const responseTimeData = [
  { range: "0-3 days", count: 8 },
  { range: "4-7 days", count: 15 },
  { range: "1-2 weeks", count: 22 },
  { range: "2-4 weeks", count: 18 },
  { range: "1+ month", count: 12 },
  { range: "No response", count: 25 },
];

const ResponseTimeChart = () => {
  const { applications, fetchApplications } = useAppStore();
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const responseTimeData = prepareResponseTimeData(applications);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={responseTimeData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="range"
          className="text-sm"
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis className="text-sm" />
        <Tooltip
          contentStyle={{
            backgroundColor: "oklch(0.141 0.005 285.823)",
            border: "1px solid oklch(1 0 0 / 10%)",
            borderRadius: "8px",
          }}
        />
        <Bar
          dataKey="count"
          fill="oklch(0.627 0.265 303.9)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResponseTimeChart;
