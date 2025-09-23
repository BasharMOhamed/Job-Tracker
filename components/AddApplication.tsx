"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AddNewApplicationForm } from "./AddNewApplicationForm";
import React from "react";
import { Application } from "@/types/Application";

export function AddApplication({
  onApplicationAdded,
}: {
  onApplicationAdded?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const handleSubmit = async (data: Omit<Application, "id">) => {
    // TODO: Implement API call to save application
    console.log("Saving application:", data);
    setOpen(false);
    onApplicationAdded?.();
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          className="hidden md:flex bg-gradient-primary text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Application
        </Button>
      </DialogTrigger>
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
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
