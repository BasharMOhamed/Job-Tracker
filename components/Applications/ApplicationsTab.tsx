import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ApplicationCards from "@/components/Applications/ApplicationCards";
import { AddApplication } from "@/components/AddApplication";

const ApplicationsTab = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold">All Applications</h1>
        <AddApplication>
          <Button size={"sm"} className="bg-gradient-primary text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </AddApplication>
      </div>
      <ApplicationCards />
    </div>
  );
};

export default ApplicationsTab;
