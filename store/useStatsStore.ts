import { StatsStore } from "@/types/StatsStore";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useStatsStore = create<StatsStore>((set, get) => ({
  applicationsStats: {
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  },

  weeklyStats: [],

  monthlyStats: [],

  responseTimeStats: [],

  fetchAppsStats: async () => {
    try {
      const res = await axios.get(`/api/stats`);
      set({ applicationsStats: res.data });
    } catch (error) {
      toast.error("Error in fetching applications stats");
    }
  },

  fetchMonthlyStats: async () => {
    try {
      const res = await axios.get(`/api/stats/monthly`);
      set({ monthlyStats: res.data });
    } catch (error) {
      toast.error("Error in fetching monthly stats");
    }
  },

  fetchResponseTimeStats: async () => {
    try {
      const res = await axios.get(`/api/stats/response-time`);
      set({ responseTimeStats: res.data });
    } catch (error) {
      toast.error("Error in fetching response time stats");
    }
  },

  fetchWeeklyStats: async () => {
    try {
      const res = await axios.get(`/api/stats/weekly`);
      set({ weeklyStats: res.data });
    } catch (error) {
      toast.error("Error in fetching weekly Stats");
    }
  },
}));
