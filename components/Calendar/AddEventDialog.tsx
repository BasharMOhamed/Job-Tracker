"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Application } from "@/types/Application";
import { useAppStore } from "@/store/useAppStore";
// import { useToast } from "@/hooks/use-toast";

export interface Event {
  id: string;
  applicationId?: string;
  title: string;
  date: Date;
  type: "interview" | "deadline" | "followup" | "review" | "negotiation";
  company: string;
  position: string;
  duration?: string;
  priority?: "low" | "medium" | "high";
  notes?: string;
}

interface AddEventDialogProps {
  children: React.ReactNode;
}

export function AddEventDialog({ children }: AddEventDialogProps) {
  const { applications, fetchApplications, addEvent } = useAppStore();
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [formData, setFormData] = useState({
    title: "",
    type: "interview" as Event["type"],
    company: "",
    position: "",
    duration: "",
    priority: "medium" as Event["priority"],
    notes: "",
    applicationId: "",
  });
  //   const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedDate ||
      !formData.title ||
      !formData.company ||
      !formData.position
    ) {
      //   toast({
      //     title: "Missing Information",
      //     description: "Please fill in all required fields",
      //     variant: "destructive",
      //   });
      return;
    }

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const eventDate = new Date(selectedDate);
    eventDate.setHours(hours, minutes, 0, 0);

    const newEvent: Event = {
      id: Date.now().toString(),
      ...formData,
      date: eventDate,
      duration: formData.duration || undefined,
      priority: formData.type === "deadline" ? formData.priority : undefined,
      notes: formData.notes || undefined,
      applicationId: formData.applicationId || undefined,
    };

    // onAddEvent(newEvent);
    // Todo --> Add Event throgh API
    addEvent(newEvent);

    // Reset form
    setFormData({
      title: "",
      type: "interview",
      company: "",
      position: "",
      duration: "",
      priority: "medium",
      notes: "",
      applicationId: "",
    });
    setSelectedDate(undefined);
    setSelectedTime("09:00");
    setOpen(false);

    // toast({
    //   title: "Event Added",
    //   description: `${formData.title} has been scheduled successfully`,
    // });
  };

  const handleApplicationSelect = (applicationId: string) => {
    const app = applications.find((a) => a.id === applicationId);
    if (app) {
      setFormData((prev) => ({
        ...prev,
        applicationId,
        company: app.company,
        position: app.position,
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Schedule New Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g., Technical Interview"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Event Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Link to Application (Optional)</Label>
            <Select
              value={formData.applicationId}
              onValueChange={handleApplicationSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an application" />
              </SelectTrigger>
              <SelectContent>
                {applications.map((app) => (
                  <SelectItem key={app.id} value={app.id}>
                    {app.company} - {app.position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                placeholder="Company name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, position: e.target.value }))
                }
                placeholder="Job title"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, duration: e.target.value }))
                }
                placeholder="e.g., 1 hour"
              />
            </div>
          </div>

          {formData.type === "deadline" && (
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) =>
                  setFormData((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Additional notes or preparation reminders..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 gradient-primary">
              Schedule Event
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
