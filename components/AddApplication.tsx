"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddNewApplicationForm } from "./AddNewApplicationForm";
import React from "react";
import { Application } from "@/types/Application";

export function AddApplication({
  children,
  application,
  Open,
}: {
  Open?: boolean;
  children?: React.ReactNode;
  application?: Application;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpenAndClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(Open || false);
  }, [Open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {React.Children.count(children) > 0 && (
        <DialogTrigger asChild>{children}</DialogTrigger>
      )}
      <DialogContent
        style={{ scrollbarWidth: "none" }}
        className="max-w-4xl max-h-[90vh] overflow-y-auto no-srollbar"
      >
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Fill in the details for your job application.
          </DialogDescription>
        </DialogHeader>
        <AddNewApplicationForm
          handleOpenAndClose={handleOpenAndClose}
          application={application}
        />
      </DialogContent>
    </Dialog>
  );
}
