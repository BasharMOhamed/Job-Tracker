import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { isAuthenticated, userId } = await auth();
    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    await connectDB();
    const applications = await ApplicationModel.find({ userId });
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const weekly = days.map((day) => ({
      day,
      applications: 0,
      responses: 0,
      responseRate: 0,
    }));

    applications.forEach((app) => {
      const dayIndex = new Date(app.dateApplied).getDay();
      weekly[dayIndex].applications++;

      if (app.responseDate) {
        weekly[dayIndex].responses++;
      }
    });

    weekly.forEach((d) => {
      d.responseRate =
        d.applications > 0
          ? Math.round((d.responses / d.applications) * 100)
          : 0;
    });

    return NextResponse.json(weekly);
  } catch (error) {
    return new NextResponse("[GET_WEEKLY_STATS] Internal Server Error", {
      status: 500,
    });
  }
}
