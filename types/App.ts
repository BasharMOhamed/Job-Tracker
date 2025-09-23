import { Application } from "./Application";
import { Event } from "./Event";

export interface AppState {
  applications: Application[];
  events: Event[];

  // actions
  fetchApplications: () => Promise<void>;
  fetchEvents: () => Promise<void>;

  addApplication: (app: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  moveApplication: (id: string, newStatus: Application["status"]) => void;

  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventsByApplication: (appId: string) => void;
  getApplicationsByStatus: (status: Application["status"]) => void;
  getApplicationsGroupedByStatus: () => Record<
    Application["status"],
    Application[]
  >;
}
