import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ApplicationDistribution from "./ApplicationDistribution";
import ResponseTimeCard from "./ResponseTimeCard";
import TrendsCard from "./TrendsCard";
import ProgressesList from "./ProgressesList";
import PerformanceCard from "./PerformanceCard";
import ResponseRateCard from "./ResponseRateCard";
import InsightsList from "./InsightsList";
import RecommendationsCard from "./RecommendationsCard";

const AnalyticsView = () => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="insights">Insights</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <div className="grid gap-6 md:grid-cols-2">
          <ApplicationDistribution />
          <ResponseTimeCard />
        </div>
      </TabsContent>
      <TabsContent value="trends" className="mt-4">
        <TrendsCard />
      </TabsContent>
      <TabsContent value="performance" className="mt-4">
        <div className="grid gap-6 md:grid-cols-2">
          <ResponseRateCard />
          <PerformanceCard />
        </div>
      </TabsContent>
      <TabsContent value="insights" className="mt-4">
        <div className="space-y-6">
          <InsightsList />
          <RecommendationsCard />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsView;
