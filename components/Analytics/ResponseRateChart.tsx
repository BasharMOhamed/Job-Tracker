"use client";
import { useAppStore } from "@/store/useAppStore";
import { useStatsStore } from "@/store/useStatsStore";
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

const ResponseRateChart = () => {
  const { weeklyStats, fetchWeeklyStats } = useStatsStore();
  useEffect(() => {
    fetchWeeklyStats();
  }, [fetchWeeklyStats]);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={weeklyStats}>
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
