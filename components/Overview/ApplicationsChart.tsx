"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStatsStore } from "@/store/useStatsStore";

const ApplicationsChart = () => {
  const { fetchMonthlyStats, monthlyStats } = useStatsStore();

  useEffect(() => {
    fetchMonthlyStats();
  }, [fetchMonthlyStats]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Application Trends
        </CardTitle>
        <CardDescription>
          Your job application activity over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={monthlyStats}>
            <defs>
              <linearGradient id="applications" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(263, 70%, 50%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(263, 70%, 50%)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="interviews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(199, 89%, 48%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(199, 89%, 48%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              stroke="white"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="white"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(0.21 0.006 285.885)",
                border: "1px solid oklch(1 0 0 / 10%)",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="applications"
              stroke="hsl(263, 70%, 50%)"
              fillOpacity={1}
              fill="url(#applications)"
            />
            <Area
              type="monotone"
              dataKey="interviews"
              stroke="hsl(199, 89%, 48%)"
              fillOpacity={1}
              fill="url(#interviews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ApplicationsChart;
