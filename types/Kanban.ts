import { Application } from "./Application";

export type Columns = {
  Applied: Application[];
  Interview: Application[];
  Offer: Application[];
  Rejected: Application[];
};

export interface KanbanColumnProps {
  id: string;
  title: string;
  jobs: Application[];
  activeJob: Application | null;
}
