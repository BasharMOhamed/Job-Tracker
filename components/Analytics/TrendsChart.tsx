"use client";
import { useStatsStore } from "@/store/useStatsStore";
import React, { useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const monthlyData = [
//   { month: "Jan", applications: 12, interviews: 3, offers: 1 },
//   { month: "Feb", applications: 15, interviews: 4, offers: 2 },
//   { month: "Mar", applications: 18, interviews: 5, offers: 1 },
//   { month: "Apr", applications: 10, interviews: 2, offers: 3 },
//   { month: "May", applications: 20, interviews: 6, offers: 1 },
//   { month: "Jun", applications: 5, interviews: 1, offers: 0 },
// ];

const TrendsChart = () => {
  const { fetchMonthlyStats, monthlyStats } = useStatsStore();
  useEffect(() => {
    fetchMonthlyStats();
  }, [fetchMonthlyStats]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={monthlyStats}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" className="text-sm" />
        <YAxis className="text-sm" />
        <Tooltip
          contentStyle={{
            backgroundColor: "oklch(0.141 0.005 285.823)",
            border: "1px solid oklch(1 0 0 / 10%)",
          }}
        />
        <Line
          type="monotone"
          dataKey="applications"
          stroke="oklch(0.92 0.004 286.32)"
          strokeWidth={3}
          dot={{ fill: "oklch(0.92 0.004 286.32)" }}
        />
        <Line
          type="monotone"
          dataKey="interviews"
          stroke="oklch(0.769 0.188 70.08)"
          strokeWidth={3}
          dot={{ fill: "oklch(0.769 0.188 70.08)" }}
        />
        <Line
          type="monotone"
          dataKey="offers"
          stroke="oklch(0.696 0.17 162.48)"
          strokeWidth={3}
          dot={{ fill: "oklch(0.696 0.17 162.48)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendsChart;
