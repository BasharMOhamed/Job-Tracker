import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import ApplicationCards from "./ApplicationCards";

const ApplicationsTab = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">All Applications</h1>
        <Button className="bg-gradient-primary text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Application
        </Button>
      </div>
      <ApplicationCards />
    </div>
  );
};

export default ApplicationsTab;
