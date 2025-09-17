import { BarChart3 } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
        <BarChart3 className="h-5 w-5 text-white" />
      </div>
      <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Job Tracker
      </h1>
    </div>
  );
};

export default Logo;
