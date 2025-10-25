import { AppState } from "@/types/App";
import { Application } from "@/types/Application";
import { Event } from "@/types/Event";
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

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
  applicationsLoading: false,

  fetchApplications: async () => {
    const res = await fetch("/api/Applications");
    const data = await res.json();
    set({ applications: data });
  },

  addApplication: async (app) => {
    try {
      set({ applicationsLoading: true });
      const res = await axios.post("/api/Applications", app);
      set((state) => ({ applications: [...state.applications, res.data] }));
      toast.success("Application Added Successfully");
      await get().fetchApplications();
      await useStatsStore.getState().fetchAppsStats();
      await useStatsStore.getState().fetchMonthlyStats();
    } catch (error) {
      toast.error("Error in Adding the Application");
    } finally {
      set({ applicationsLoading: false });
    }
  },

  updateApplication: async (id, updates) => {
    try {
      set({ applicationsLoading: true });
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
    } finally {
      set({ applicationsLoading: false });
    }
  },

  moveApplication: async (id, newStatus) => {
    try {
      set({ applicationsLoading: true });

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
    } finally {
      set({ applicationsLoading: false });
    }
  },

  deleteApplication: async (id) => {
    try {
      set({ applicationsLoading: true });
      const res = await axios.delete(`api/Applications/${id}`);
      set((state) => ({
        applications: state.applications.filter((app) => app._id !== id),
      }));
      await useStatsStore.getState().fetchAppsStats();
      toast.success("Application Deleted Successfully");
    } catch (error) {
      toast.error("Error in Deleting the Application");
    } finally {
      set({ applicationsLoading: false });
    }
  },

  getApplication: async (id) => {
    try {
      set({ applicationsLoading: true });
      const res = await axios.get(`api/Applications/${id}`);
      return res.data;
    } catch (error) {
      toast.error("Error in geting the Application");
    } finally {
      set({ applicationsLoading: false });
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
