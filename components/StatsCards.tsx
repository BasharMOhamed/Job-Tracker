"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Calendar,
  CheckCircle,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { StatCardProps } from "@/types/Stats";
import { useAppStore } from "@/store/useAppStore";

const StatsCards = () => {
  const { applications, getApplicationsGroupedByStatus, fetchApplications } =
    useAppStore();
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);
  const total = applications.length;
  const applicationsGroupedByStatus = getApplicationsGroupedByStatus();
  // const interviews = applicationsGroupedByStatus.Interview.length
  // const offers = applicationsGroupedByStatus.Offer.length
  // const rejections = applicationsGroupedByStatus.Rejected.length
  const responses = total - applicationsGroupedByStatus.Applied.length;
  return (
    <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
      <StatCard
        title="Total Applications"
        value={total}
        description="+12% from last week"
        trend="+12%"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Interviews Scheduled"
        value={applicationsGroupedByStatus.Interview.length}
        description="+3 this week"
        trend="+3"
        icon={<Calendar className="h-4 w-4 text-warning" />}
      />
      <StatCard
        title="Offers Received"
        value={applicationsGroupedByStatus.Offer.length}
        description="+1 pending decision"
        trend="+1"
        icon={<CheckCircle className="h-4 w-4 text-success" />}
      />
      <StatCard
        title="Rejections"
        value={applicationsGroupedByStatus.Rejected.length}
        description={`${Math.round((responses / total) * 100)}% response rate`}
        icon={<XCircle className="h-4 w-4 text-destructive" />}
      />
    </div>
  );
};

const StatCard = ({
  title,
  icon,
  trend,
  description,
  className,
  value,
}: StatCardProps) => {
  return (
    <Card className={`transition-smooth hover:shadow-card ${className}`}>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
        {icon}
      </CardHeader>
      <CardContent>
        <h2 className="font-bold text-2xl">{value}</h2>
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          {trend && (
            <span className="text-success flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12%
            </span>
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCards;
