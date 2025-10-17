import React, { useState } from "react";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, X } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Event } from "@/types/Event";
import { AddEventDialog } from "./AddEventDialog";

const EventOptions = ({ event }: { event: Event }) => {
  const { deleteEvent } = useAppStore();
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
          <DropdownMenuItem onClick={() => deleteEvent(event._id)}>
            <X className="mr-2 h-4 w-4" color="red" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <AddApplication application={application} Open={open} /> */}
      <AddEventDialog event={event} Open={open} />
    </>
  );
};

export default EventOptions;
