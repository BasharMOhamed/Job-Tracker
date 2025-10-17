"use client";
import React, { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { ProgressComponentProps } from "@/types/Progress";
import { useStatsStore } from "@/store/useStatsStore";

const ProgressesList = () => {
  const { applicationsStats, fetchAppsStats } = useStatsStore();
  useEffect(() => {
    fetchAppsStats();
  }, [fetchAppsStats]);

  const total =
    applicationsStats.Applied +
    applicationsStats.Interview +
    applicationsStats.Offer +
    applicationsStats.Rejected;
  const interviewCount = applicationsStats.Interview;
  const offerCount = applicationsStats.Offer;

  // Avoid division by zero
  const applicationToInterviewRate =
    total > 0 ? Math.round((interviewCount / total) * 100) : 0;

  const interviewToOfferRate =
    interviewCount > 0
      ? Math.round((offerCount / (interviewCount + offerCount)) * 100)
      : 0;

  const overallSuccessRate =
    total > 0 ? Math.round((offerCount / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <ProgressComponent
        title="Application-to-Interview Rate"
        value={applicationToInterviewRate}
        color="orange"
      />
      <ProgressComponent
        title="Interview-to-Offer Rate"
        value={interviewToOfferRate}
        color="oklch(0.705 0.015 286.067)"
      />
      <ProgressComponent
        title="Overall Success Rate"
        value={overallSuccessRate}
        color="oklch(0.627 0.265 303.9)"
      />
      <ProgressComponent
        title="Rejection Rate"
        value={overallSuccessRate}
        color="red"
      />
    </div>
  );
};

export default ProgressesList;

const ProgressComponent = ({ title, value, color }: ProgressComponentProps) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm">{title}</h3>
        <span style={{ color: color }} className={`font-bold text-lg`}>
          {value}%
        </span>
      </div>
      <Progress value={value} className={`w-[${value}%]`} color={color} />
    </div>
  );
};
