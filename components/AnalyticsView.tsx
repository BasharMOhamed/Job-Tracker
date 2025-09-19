import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ApplicationDistribution from "./ApplicationDistribution";
import ResponseTimeCard from "./ResponseTimeCard";

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
        {/* <ApplicationCards /> */}
        {/* <ApplicationsTab /> */}
      </TabsContent>
      <TabsContent value="performance" className="mt-4">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">Performance</h3>
          <p className="text-muted-foreground mt-2">
            Performance interface coming soon...
          </p>
        </div>
      </TabsContent>
      <TabsContent value="insights" className="mt-4">
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
