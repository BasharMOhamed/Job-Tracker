import { AppState } from "@/types/App";
import { Application } from "@/types/Application";
import { Event } from "@/types/Event";
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

// const mockApplications: Application[] = [
//   {
//     id: "5465",
//     company: "TechCorp",
//     position: "Senior Frontend Developer",
//     location: "San Francisco, CA",
//     status: "Interview",
//     dateApplied: new Date("2024-01-15"),
//     dateResponded: new Date("2024-01-25"),
//     notes:
//       "Great company culture, competitive salary. Interview scheduled for next week.",
//   },
//   {
//     id: "548791651665",

//     company: "StartupXYZ",
//     position: "Full Stack Engineer",
//     location: "Remote",
//     status: "Applied",
//     dateApplied: new Date("2024-01-12"),
//     notes: "Early stage startup, equity opportunity.",
//   },
//   {
//     id: "5484919165",

//     company: "BigTech Inc",
//     position: "Software Engineer",
//     location: "Seattle, WA",
//     status: "Offer",
//     dateApplied: new Date("2024-01-08"),
//     dateResponded: new Date("2024-05-15"),
//     notes: "Excellent benefits package, waiting on decision deadline.",
//   },
//   {
//     id: "54765465",

//     company: "DataFlow",
//     position: "React Developer",
//     location: "Austin, TX",
//     status: "Rejected",
//     dateApplied: new Date("2024-01-05"),
//     dateResponded: new Date("2024-01-07"),
//     notes: "Feedback: Looking for more backend experience.",
//   },
//   {
//     id: "547654651",

//     company: "DataFlow",
//     position: "React Developer",
//     location: "Austin, TX",
//     status: "Rejected",
//     dateApplied: new Date("2024-01-05"),
//     dateResponded: new Date("2024-01-07"),
//     notes: "Feedback: Looking for more backend experience.",
//   },
//   {
//     id: "547654652",

//     company: "DataFlow",
//     position: "React Developer",
//     location: "Austin, TX",
//     status: "Rejected",
//     dateApplied: new Date("2024-01-05"),
//     dateResponded: new Date("2024-01-07"),
//     notes: "Feedback: Looking for more backend experience.",
//   },
//   {
//     id: "547654653",

//     company: "DataFlow",
//     position: "React Developer",
//     location: "Austin, TX",
//     status: "Rejected",
//     dateApplied: new Date("2024-01-05"),
//     dateResponded: new Date("2024-01-07"),
//     notes: "Feedback: Looking for more backend experience.",
//   },
//   {
//     id: "547654654",
//     company: "DataFlow",
//     position: "React Developer",
//     location: "Austin, TX",
//     status: "Rejected",
//     dateApplied: new Date("2024-02-05"),
//     dateResponded: new Date("2024-02-07"),
//     notes: "Feedback: Looking for more backend experience.",
//   },
//   {
//     id: "547654655",
//     company: "DataFlow",
//     position: "React Developer",
//     location: "Austin, TX",
//     status: "Rejected",
//     dateApplied: new Date("2024-02-05"),
//     dateResponded: new Date("2024-02-07"),
//     notes: "Feedback: Looking for more backend experience.",
//   },
//   {
//     id: "547654656",
//     company: "DataFlow",
//     position: "React Developer",
//     location: "Austin, TX",
//     status: "Rejected",
//     dateApplied: new Date("2024-03-05"),
//     dateResponded: new Date("2024-03-07"),
//     notes: "Feedback: Looking for more backend experience.",
//   },
//   {
//     id: "547654657",
//     company: "DataFlow",
//     position: "React Developer",
//     location: "Austin, TX",
//     status: "Rejected",
//     dateApplied: new Date("2024-01-05"),
//     dateResponded: new Date("2024-01-07"),
//     notes: "Feedback: Looking for more backend experience.",
//   },
// ];

// const initialMockEvents: Event[] = [
//   {
//     id: "1",
//     applicationId: "1",
//     title: "Technical Interview",
//     date: new Date(2025, 8, 25, 14, 0), // Sept 25, 2025, 2:00 PM
//     type: "interview" as const,
//     company: "TechCorp",
//     position: "Senior Frontend Developer",
//     duration: "1 hour",
//   },
//   {
//     id: "2",
//     applicationId: "3",
//     title: "Offer Decision Deadline",
//     date: new Date(2025, 8, 30, 17, 0), // Sept 30, 2025, 5:00 PM
//     type: "deadline" as const,
//     company: "BigTech Inc",
//     position: "Software Engineer",
//     priority: "high",
//   },
//   {
//     id: "3",
//     applicationId: "2",
//     title: "Follow-up Call",
//     date: new Date(2025, 8, 23, 10, 0), // Sept 23, 2025, 10:00 AM
//     type: "followup" as const,
//     company: "StartupXYZ",
//     position: "Full Stack Engineer",
//     duration: "30 minutes",
//   },
//   {
//     id: "4",
//     applicationId: "4",
//     title: "HR Screening",
//     date: new Date(2025, 8, 24, 9, 0), // Sept 24, 2025, 9:00 AM
//     type: "interview" as const,
//     company: "InnovateTech",
//     position: "React Developer",
//     duration: "45 minutes",
//   },
//   {
//     id: "5",
//     applicationId: "5",
//     title: "Final Round Interview",
//     date: new Date(2025, 8, 27, 15, 30), // Sept 27, 2025, 3:30 PM
//     type: "interview" as const,
//     company: "DevStudio",
//     position: "Lead Frontend Engineer",
//     duration: "2 hours",
//   },
//   {
//     id: "6",
//     applicationId: "6",
//     title: "Portfolio Review",
//     date: new Date(2025, 8, 26, 11, 0), // Sept 26, 2025, 11:00 AM
//     type: "review" as const,
//     company: "DesignCo",
//     position: "UI/UX Developer",
//     duration: "1 hour",
//   },
//   {
//     id: "7",
//     applicationId: "7",
//     title: "Salary Negotiation",
//     date: new Date(2025, 8, 29, 16, 0), // Sept 29, 2025, 4:00 PM
//     type: "negotiation" as const,
//     company: "FinTech Solutions",
//     position: "Senior Developer",
//     duration: "45 minutes",
//   },
//   {
//     id: "8",
//     applicationId: "8",
//     title: "Take-home Project Due",
//     date: new Date(2025, 9, 1, 23, 59), // Oct 1, 2025, 11:59 PM
//     type: "deadline" as const,
//     company: "CodeCraft",
//     position: "Full Stack Developer",
//     priority: "medium",
//   },
// ];

/**
 * Applications:
 *  -get applications
 *  -edit application
 *  -delete application
 *  -create application
 *  -get specific appplication
 *
 * Events:
 *  -get events
 *  -edit event
 *  -delete event
 *  -create event
 *  -get specific event
 *
 * Activity:
 *  -get activities
 *  -create activity
 *
 * Stats:
 *  -get monthly stats
 *  -get weekly stats
 *  -get response time
 *  -get apps grouped by status
 *
 */

import { useStatsStore } from "./useStatsStore";

export const useAppStore = create<AppState>((set, get) => ({
  applications: [],
  events: [],
  todaysEvents: [],
  applicationsGroupedByStatus: {
    Applied: [],
    Interview: [],
    Offer: [],
    Rejected: [],
  },
  activities: [],

  fetchApplications: async () => {
    const res = await fetch("/api/Applications");
    const data = await res.json();
    set({ applications: data });
  },

  addApplication: async (app) => {
    try {
      const res = await axios.post("/api/Applications", app);
      set((state) => ({ applications: [...state.applications, res.data] }));
      toast.success("Application Added Successfully");
      await get().fetchApplications();
      await useStatsStore.getState().fetchAppsStats();
      await useStatsStore.getState().fetchMonthlyStats();
    } catch (error) {
      console.log(error);
      toast.error("Error in Adding the Application");
    }
  },

  updateApplication: async (id, updates) => {
    try {
      const res = await axios.patch(`/api/Applications/${id}`, updates);
      set((state) => ({
        applications: state.applications.map((app) =>
          app._id === id ? { ...app, ...updates } : app
        ),
      }));
      await useStatsStore.getState().fetchAppsStats();
      toast.success("Application Updated Successfully");
    } catch (error) {
      toast.error("Error in Updating the Application");
    }
  },

  moveApplication: async (id, newStatus) => {
    try {
      set((state) => ({
        applications: state.applications.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        ),
      }));
      const res = await axios.patch(`api/Applications/${id}`, {
        status: newStatus,
      });
      await useStatsStore.getState().fetchAppsStats();
    } catch (error) {
      toast.error("Error in Updating the Status");
    }
  },

  deleteApplication: async (id) => {
    try {
      const res = await axios.delete(`api/Applications/${id}`);
      set((state) => ({
        applications: state.applications.filter((app) => app._id !== id),
      }));
      toast.success("Application Deleted Successfully");
    } catch (error) {
      toast.error("Error in Deleting the Application");
    }
  },

  getApplication: async (id) => {
    try {
      const res = await axios.get(`api/Applications/${id}`);
      return res.data;
    } catch (error) {
      toast.error("Error in geting the Application");
    }
  },

  fetchEvents: async () => {
    try {
      const res = await axios.get("/api/events");
      set({ events: res.data });
    } catch (error) {
      toast.error("Error in fetching events");
    }
  },

  fetchTodayEvents: async () => {
    try {
      const res = await axios.get(`/api/events/today`);
      set({ todaysEvents: res.data });
    } catch (error) {
      toast.error("Error in fetching todays events");
    }
  },

  updateEvent: async (id, updates) => {
    try {
      const res = await axios.patch(`api/events/${id}`, updates);
      set((state) => ({
        events: state.events.map((e) =>
          e._id === id ? { ...e, ...updates } : e
        ),
      }));
      toast.success("Event Updated Successfully");
    } catch (error) {
      toast.error("Error in Updating the Event");
    }
  },

  deleteEvent: async (id) => {
    try {
      const res = await axios.delete(`api/events/${id}`);
      set((state) => ({
        events: state.events.filter((e) => e._id !== id),
      }));
      toast.success("Event Deleted Successfully");
    } catch (error) {
      toast.error("Error in Deleting the Event");
    }
  },

  addEvent: async (event) => {
    try {
      const res = await axios.post(`api/events`, event);
      set((state) => ({ events: [...state.events, res.data] }));
      await get().createActivity({
        type: "Interview",
        message: `${event.type} scheduled with ${event.company}`,
      });
      toast.success("New Event Added Successfully");
    } catch (error) {
      toast.error("Error in Adding the Event");
    }
  },

  getEvent: async (id) => {
    try {
      const res = await axios.get(`api/events/${id}`);
      return res.data;
    } catch (error) {
      toast.error("Error in fetching event");
    }
  },

  getActivities: async (number) => {
    try {
      const res = await axios.get(`api/activity?count=${number}`);
      set({ activities: res.data });
    } catch (error) {
      toast.error("Error in fetching activities");
    }
  },

  createActivity: async (activity) => {
    try {
      const res = await axios.post(`api/activity`, activity);
    } catch (error) {
      toast.error("Error in adding activity");
    }
  },

  getEventsByStatus: (status: Application["status"]) =>
    get().events.filter((event) => {
      const app = get().applications.find((a) => a._id === event.applicationId);
      return app?.status === status;
    }),

  getApplicationsGroupedByStatus: async () => {
    try {
      const res = await axios.get(`api/Applications/grouped-by-status/`);
      set({ applicationsGroupedByStatus: res.data });
    } catch (error) {
      toast.error("Error in Fetching Applications");
    }
  },
  getApplicationsStats: async () => {
    try {
      const res = await axios.get(`api/stats`);
    } catch (error) {
      toast.error("Error in Fetching Applications");
    }
  },
}));
