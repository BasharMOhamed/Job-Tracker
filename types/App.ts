import { Activity, ActivityDTO } from "./Activity";
import { Application } from "./Application";
import { Event } from "./Event";

export interface AppState {
  applications: Application[];
  events: Event[];
  todaysEvents: Event[];
  applicationsGroupedByStatus: applicationsGroupedByStatus;
  activities: ActivityDTO[];
  applicationsLoading: boolean;

  // actions
  fetchApplications: () => Promise<void>;

  addApplication: (app: Omit<Application, "_id">) => Promise<void>;
  updateApplication: (
    id: string,
    updates: Partial<Application>
  ) => Promise<void>;
  moveApplication: (
    id: string,
    newStatus: Application["status"]
  ) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  getApplication: (id: string) => Promise<Application>;

  fetchEvents: () => Promise<void>;
  fetchTodayEvents: () => Promise<void>;
  addEvent: (event: Omit<Event, "_id">) => Promise<void>;
  updateEvent: (id: string, updates: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEvent: (id: string) => Promise<Event>;

  getActivities: (number?: number) => Promise<void>;
  createActivity: (activity: Omit<ActivityDTO, "_id">) => Promise<void>;

  getApplicationsGroupedByStatus: () => Promise<void>;
}

export interface applicationsGroupedByStatus {
  Applied: Application[];
  Interview: Application[];
  Offer: Application[];
  Rejected: Application[];
}
