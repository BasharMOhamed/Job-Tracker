import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AnalyticsView from "./AnalyticsView";

const AnalyticsDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        style={{ scrollbarWidth: "none" }}
        className="max-w-7xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Analytics Dashboard</DialogTitle>
          <DialogDescription>
            Detailed insights into your job search performance
          </DialogDescription>
        </DialogHeader>
        <AnalyticsView />
      </DialogContent>
    </Dialog>
  );
};

export default AnalyticsDialog;
