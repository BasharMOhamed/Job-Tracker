import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicationDistribution from "@/components/Analytics/ApplicationDistribution";
import ResponseTimeCard from "@/components/Analytics/ResponseTimeCard";
import TrendsCard from "@/components/Analytics/TrendsCard";
import PerformanceCard from "@/components/Analytics/PerformanceCard";
import ResponseRateCard from "@/components/Analytics/ResponseRateCard";
import InsightsList from "@/components/Analytics/InsightsList";
import RecommendationsCard from "@/components/Analytics/RecommendationsCard";

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
        {/* <div className="space-y-6">
          <InsightsList />
          <RecommendationsCard />
        </div> */}
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">Insights</h3>
          <p className="text-muted-foreground mt-2">
            Insights view coming soon...
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsView;
