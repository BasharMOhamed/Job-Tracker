import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const applications = await ApplicationModel.find({
      updatedAt: { $lte: new Date() },
    });
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

    // 1. Get current month
    const currentMonth = new Date().getMonth();

    const last6Months = Array.from({ length: 6 }).map((_, i) => {
      const monthIndex = (currentMonth - 5 + i + 12) % 12;
      return { month: monthNames[monthIndex], monthIndex };
    });

    const grouped = last6Months.map(({ month, monthIndex }) => ({
      month,
      applications: 0,
      interviews: 0,
      offers: 0,
      monthIndex,
    }));

    applications.forEach((app) => {
      const monthIndex = app.dateApplied.getMonth();
      const target = grouped.find((g) => g.monthIndex === monthIndex);
      if (target) {
        target.applications += 1;
        if (app.status === "Interview") target.interviews += 1;
        if (app.status === "Offer") target.offers += 1;
      }
    });

    const result = grouped.map(
      ({ month, applications, interviews, offers }) => ({
        month,
        applications,
        interviews,
        offers,
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse("[GET_MONTHLY_STATS] Internal Server Error", {
      status: 500,
    });
  }
}
