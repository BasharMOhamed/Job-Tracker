import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, X } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { Application } from "@/types/Application";
import { AddApplication } from "@/components/AddApplication";

const ApplicationOptions = ({ application }: { application: Application }) => {
  const { deleteApplication } = useAppStore();
  const [open, setOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size={"sm"} variant="ghost" className="cursor-pointer">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteApplication(application._id)}>
            <X className="mr-2 h-4 w-4" color="red" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddApplication application={application} Open={open} />
    </>
  );
};

export default ApplicationOptions;
