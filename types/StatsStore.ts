import {
  ApplicationsStats,
  MonthlyStat,
  ResponseTimeStat,
  WeeklyStat,
} from "./Stats";

export interface StatsStore {
  applicationsStats: ApplicationsStats;
  weeklyStats: WeeklyStat[];
  monthlyStats: MonthlyStat[];
  responseTimeStats: ResponseTimeStat[];

  fetchAppsStats: () => Promise<void>;
  fetchWeeklyStats: () => Promise<void>;
  fetchMonthlyStats: () => Promise<void>;
  fetchResponseTimeStats: () => Promise<void>;
}
