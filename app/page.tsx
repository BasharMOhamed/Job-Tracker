import ApplicationCards from "@/components/ApplicationCards";
import ApplicationsTab from "@/components/ApplicationsTab";
import Hero from "@/components/Hero";
import StatsCards from "@/components/StatsCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-5 md:px-0">
      <Hero />

      <StatsCards />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          Overview Content
        </TabsContent>
        <TabsContent value="applications" className="mt-4">
          {/* <ApplicationCards /> */}
          <ApplicationsTab />
        </TabsContent>
        <TabsContent value="kanban" className="mt-4">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold">Kanban Board</h3>
            <p className="text-muted-foreground mt-2">
              Drag and drop interface coming soon...
            </p>
          </div>
        </TabsContent>
        <TabsContent value="calendar" className="mt-4">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold">Interview Calendar</h3>
            <p className="text-muted-foreground mt-2">
              Calendar view coming soon...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
