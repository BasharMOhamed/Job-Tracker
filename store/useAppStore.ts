import { AppState } from "@/types/App";
import { Application } from "@/types/Application";
import { Event } from "@/types/Event";
import { create } from "zustand";

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

const initialMockEvents: Event[] = [
  {
    id: "1",
    applicationId: "1",
    title: "Technical Interview",
    date: new Date(2025, 8, 25, 14, 0), // Sept 25, 2025, 2:00 PM
    type: "interview" as const,
    company: "TechCorp",
    position: "Senior Frontend Developer",
    duration: "1 hour",
  },
  {
    id: "2",
    applicationId: "3",
    title: "Offer Decision Deadline",
    date: new Date(2025, 8, 30, 17, 0), // Sept 30, 2025, 5:00 PM
    type: "deadline" as const,
    company: "BigTech Inc",
    position: "Software Engineer",
    priority: "high",
  },
  {
    id: "3",
    applicationId: "2",
    title: "Follow-up Call",
    date: new Date(2025, 8, 23, 10, 0), // Sept 23, 2025, 10:00 AM
    type: "followup" as const,
    company: "StartupXYZ",
    position: "Full Stack Engineer",
    duration: "30 minutes",
  },
  {
    id: "4",
    applicationId: "4",
    title: "HR Screening",
    date: new Date(2025, 8, 24, 9, 0), // Sept 24, 2025, 9:00 AM
    type: "interview" as const,
    company: "InnovateTech",
    position: "React Developer",
    duration: "45 minutes",
  },
  {
    id: "5",
    applicationId: "5",
    title: "Final Round Interview",
    date: new Date(2025, 8, 27, 15, 30), // Sept 27, 2025, 3:30 PM
    type: "interview" as const,
    company: "DevStudio",
    position: "Lead Frontend Engineer",
    duration: "2 hours",
  },
  {
    id: "6",
    applicationId: "6",
    title: "Portfolio Review",
    date: new Date(2025, 8, 26, 11, 0), // Sept 26, 2025, 11:00 AM
    type: "review" as const,
    company: "DesignCo",
    position: "UI/UX Developer",
    duration: "1 hour",
  },
  {
    id: "7",
    applicationId: "7",
    title: "Salary Negotiation",
    date: new Date(2025, 8, 29, 16, 0), // Sept 29, 2025, 4:00 PM
    type: "negotiation" as const,
    company: "FinTech Solutions",
    position: "Senior Developer",
    duration: "45 minutes",
  },
  {
    id: "8",
    applicationId: "8",
    title: "Take-home Project Due",
    date: new Date(2025, 9, 1, 23, 59), // Oct 1, 2025, 11:59 PM
    type: "deadline" as const,
    company: "CodeCraft",
    position: "Full Stack Developer",
    priority: "medium",
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  applications: [],
  events: [],

  fetchApplications: async () => {
    const res = await fetch("/api/Applications");
    const data = await res.json();
    set({ applications: data });
  },

  fetchEvents: async () => {
    // const res = await fetch("/api/events");
    // const data = await res.json();
    set({ events: initialMockEvents });
  },

  addApplication: (app) =>
    set((state) => ({ applications: [...state.applications, app] })),

  updateApplication: (id, updates) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app._id === id ? { ...app, ...updates } : app
      ),
    })),

  moveApplication: (id, newStatus) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app._id === id ? { ...app, status: newStatus } : app
      ),
    })),

  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),

  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),

  getEventsByApplication: (appId: string) =>
    get().events.filter((e) => e.applicationId === appId),

  getApplicationsByStatus: (status: Application["status"]) =>
    get().applications.filter((app) => app.status === status),

  getEventsByStatus: (status: Application["status"]) =>
    get().events.filter((event) => {
      const app = get().applications.find((a) => a._id === event.applicationId);
      return app?.status === status;
    }),

  getApplicationsGroupedByStatus: () => {
    const apps = get().applications;
    return {
      Applied: apps.filter((app) => app.status === "Applied"),
      Interview: apps.filter((app) => app.status === "Interview"),
      Offer: apps.filter((app) => app.status === "Offer"),
      Rejected: apps.filter((app) => app.status === "Rejected"),
    };
  },
}));
