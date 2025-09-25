import { differenceInDays, format } from "date-fns";
import { Application } from "@/types/Application";

export const groupApplicationsByMonth = (applications: Application[]) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const grouped = monthNames.map((month) => ({
    month,
    applications: 0,
    interviews: 0,
    offers: 0,
  }));

  applications.forEach((app) => {
    const monthIndex = app.dateApplied.getMonth(); // 0 = Jan, 11 = Dec
    grouped[monthIndex].applications += 1;
    if (app.status === "Interview") grouped[monthIndex].interviews += 1;
    if (app.status === "Offer") grouped[monthIndex].offers += 1;
  });

  return grouped;
};

function getResponseCategory(application: Application) {
  if (!application.dateResponded) {
    return "No response";
  }

  const diffInDays = differenceInDays(
    application.dateResponded,
    application.dateApplied
  );

  if (diffInDays <= 3) return "0-3 days";
  if (diffInDays <= 7) return "4-7 days";
  if (diffInDays <= 14) return "1-2 weeks";
  if (diffInDays <= 28) return "2-4 weeks";
  return "1+ month";
}

export function prepareResponseTimeData(applications: Application[]) {
  const buckets = {
    "0-3 days": 0,
    "4-7 days": 0,
    "1-2 weeks": 0,
    "2-4 weeks": 0,
    "1+ month": 0,
    "No response": 0,
  };

  applications.forEach((app) => {
    if (!app.dateResponded) {
      buckets["No response"]++;
      return;
    }

    const diffInDays = differenceInDays(app.dateResponded, app.dateApplied);

    if (diffInDays <= 3) buckets["0-3 days"]++;
    else if (diffInDays <= 7) buckets["4-7 days"]++;
    else if (diffInDays <= 14) buckets["1-2 weeks"]++;
    else if (diffInDays <= 28) buckets["2-4 weeks"]++;
    else buckets["1+ month"]++;
  });

  return Object.entries(buckets).map(([range, count]) => ({ range, count }));
}

export function prepareWeeklyResponseData(applications: Application[]) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // initialize counters
  const weekly = days.map((day) => ({
    day,
    applications: 0,
    responses: 0,
    responseRate: 0,
  }));

  applications.forEach((app) => {
    const dayIndex = new Date(app.dateApplied).getDay();
    weekly[dayIndex].applications++;

    if (app.dateResponded) {
      weekly[dayIndex].responses++;
    }
  });

  // calculate responseRate
  weekly.forEach((d) => {
    d.responseRate =
      d.applications > 0 ? Math.round((d.responses / d.applications) * 100) : 0;
  });

  return weekly;
}
