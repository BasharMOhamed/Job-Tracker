"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, FileType, Plus, Save, Upload, X } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { AddApplicationFormProps } from "@/types/Application";
import toast from "react-hot-toast";
import { Attachment } from "@/models/Application";
import axios from "axios";
import { useAppStore } from "@/store/useAppStore";
// import { Attachment } from "@/models/Application";
// import { useToast } from "@/hooks/use-toast";

const applicationSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position title is required"),
  jobLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  location: z.string().optional(),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
  dateApplied: z.date(),
  interviewDate: z.date().optional(),
  interviewType: z.enum(["Onsite", "Remote", "Phone", "Other"]).optional(),
  interviewer: z.string().optional(),
  meetingLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  notes: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export function AddNewApplicationForm({
  handleOpenAndClose,
  application,
}: AddApplicationFormProps) {
  //   const { toast } = useToast();
  const { addApplication, updateApplication, applicationsLoading } =
    useAppStore();
  const [attachments, setAttachments] = React.useState<Attachment[]>(
    application?.attachments || []
  );

  const [pendingFiles, setPendingFiles] = React.useState<File[]>([]);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: application?.company || "",
      position: application?.position || "",
      jobLink: application?.jobLink || "",
      location: application?.location || "",
      status: application?.status || "Applied",
      dateApplied: application ? new Date(application.dateApplied) : new Date(),
      interviewer: application?.interviewer || "",
      meetingLink: application?.meetingLink || "",
      notes: application?.notes || "",
    },
  });

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (!files || files.length === 0) return;
  //   const newFiles = Array.from(files).map((file) => {
  //     return {
  //       filename: file.name,
  //       fileSize: file.size,
  //       fileType: file.type,
  //       url: "",
  //     };
  //   });
  //   setAttachments((prev) => [...prev, ...newFiles]);
  // };

  const removeUploadedAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleFileUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const files = event.target.files;
  //   if (!files || files.length === 0) return;

  //   // convert File -> { filename, contentType, data (base64), size }
  //   const toPayload = (file: File) =>
  //     new Promise<{
  //       filename: string;
  //       contentType: string;
  //       data: string;
  //       size: number;
  //     }>((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onerror = () => reject(new Error("File read error"));
  //       reader.onload = () => {
  //         const result = reader.result as string; // data:<type>;base64,<base64>
  //         const base64 = result.split(",")[1];
  //         resolve({
  //           filename: file.name,
  //           contentType: file.type || "application/octet-stream",
  //           data: base64,
  //           size: file.size,
  //         });
  //       };
  //       reader.readAsDataURL(file);
  //     });

  //   try {
  //     const filePayloads = await Promise.all(Array.from(files).map(toPayload));

  //     // send to server upload endpoint
  //     const res = await fetch("/api/upload", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         files: filePayloads.map(({ filename, contentType, data }) => ({
  //           filename,
  //           contentType,
  //           data,
  //         })),
  //       }),
  //     });

  //     if (!res.ok) {
  //       throw new Error("Upload failed");
  //     }

  //     const data = await res.json();
  //     const uploaded = data.files.map((f: any, index: number) => ({
  //       filename: f.filename,
  //       fileSize: filePayloads[index].size,
  //       fileType: f.fileType,
  //       url: f.url,
  //       public_id: f.public_id,
  //     }));

  //     setAttachments((prev) => [...prev, ...uploaded]);
  //     toast.success("Files uploaded");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("File upload failed");
  //   } finally {
  //     if (event.target) event.target.value = "";
  //   }
  // };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setPendingFiles((prev) => [...prev, ...Array.from(files)]);
    if (event.target) event.target.value = "";
  };

  const removePendingFile = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadPendingFiles = async (files: File[]) => {
    if (!files.length) return [];
    // convert to base64 payloads
    const toPayload = (file: File) =>
      new Promise<{
        filename: string;
        contentType: string;
        data: string;
        size: number;
      }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("File read error"));
        reader.onload = () => {
          const result = reader.result as string; // data:<type>;base64,<base64>
          const base64 = result.split(",")[1];
          resolve({
            filename: file.name,
            contentType: file.type || "application/octet-stream",
            data: base64,
            size: file.size,
          });
        };
        reader.readAsDataURL(file);
      });

    const filePayloads = await Promise.all(files.map(toPayload));

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        files: filePayloads.map(({ filename, contentType, data }) => ({
          filename,
          contentType,
          data,
        })),
      }),
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }
    const data = await res.json();
    // map server response to Attachment shape used in your model
    const uploaded: Attachment[] = data.files.map((f: any, i: number) => ({
      filename: f.filename,
      fileSize: filePayloads[i].size,
      fileType: f.fileType || filePayloads[i].contentType,
      url: f.url,
      public_id: f.public_id,
    }));
    return uploaded;
  };

  // const handleSubmit = async (data: ApplicationFormData) => {
  //   try {
  //     // TODO: Handle file uploads to your backend/storage
  //     application
  //       ? updateApplication(application._id, { ...data, attachments })
  //       : addApplication({ ...data, attachments });
  //     handleOpenAndClose();
  //   } catch (error) {
  //     toast.error("Failed to add application. Please try again.");
  //   }
  // };

  const handleSubmit = async (data: ApplicationFormData) => {
    try {
      // if there are pending files, upload them now
      let uploadedAttachments: Attachment[] = [];
      if (pendingFiles.length > 0) {
        try {
          uploadedAttachments = await uploadPendingFiles(pendingFiles);
        } catch (err) {
          console.error("File upload failed", err);
          toast.error("File upload failed. Please try again.");
          return; // don't proceed to creating/updating application if file upload failed
        }
      }

      const finalAttachments = [...attachments, ...uploadedAttachments];

      // prepare payload: convert dates to ISO strings if needed by backend
      const payload = {
        ...data,
        attachments: finalAttachments,
      };

      if (application) {
        await updateApplication(application._id, payload);
        toast.success("Application updated");
      } else {
        await addApplication(payload);
        toast.success("Application added");
      }

      // clear pending files after successful submit
      setPendingFiles([]);
      // if new application added, attachments in form should reflect saved ones
      setAttachments(finalAttachments);

      handleOpenAndClose?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add application. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Google, Microsoft" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Position */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Link */}
            <FormField
              control={form.control}
              name="jobLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. New York, NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Interview">Interview</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Applied */}
            <FormField
              control={form.control}
              name="dateApplied"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Applied</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Interview Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Interview Details (Optional)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Interview Date */}
              <FormField
                control={form.control}
                name="interviewDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Interview Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Interview Type */}
              <FormField
                control={form.control}
                name="interviewType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Onsite">Onsite</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Phone">Phone</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Interviewer */}
              <FormField
                control={form.control}
                name="interviewer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interviewer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Meeting Link */}
              <FormField
                control={form.control}
                name="meetingLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Zoom/Meet link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Additional notes about this application..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <Label>Attachments</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="relative"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </Button>
              <span className="text-sm text-muted-foreground">
                PDF, DOC, DOCX, TXT files
              </span>
            </div>

            {/* show already uploaded attachments */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={`uploaded-${index}`}
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                  >
                    <span className="text-sm font-medium">{file.filename}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUploadedAttachment(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* show pending files (not uploaded yet) */}
            {pendingFiles.length > 0 && (
              <div className="space-y-2">
                {pendingFiles.map((file, index) => (
                  <div
                    key={`pending-${index}`}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <FileType className="w-4 h-4" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePendingFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleOpenAndClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {application ? (
                <>
                  {form.formState.isSubmitting ? (
                    <svg
                      className="animate-spin w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </>
              ) : (
                <>
                  {form.formState.isSubmitting ? (
                    <svg
                      className="animate-spin w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Application
                    </>
                  )}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
