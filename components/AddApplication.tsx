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

interface ApplicationFormData {
  company: string;
  position: string;
  jobLink?: string;
  location?: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  dateApplied: Date;
  interviewDate?: Date;
  interviewType?: "Onsite" | "Remote" | "Phone" | "Other";
  interviewer?: string;
  meetingLink?: string;
  notes?: string;
}

interface AddApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddApplication({
  onApplicationAdded,
}: {
  onApplicationAdded?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const handleSubmit = async (data: ApplicationFormData) => {
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto no-srollbar">
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
