import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const applications = await ApplicationModel.find();
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
      const monthIndex = app.dateApplied.getMonth();
      grouped[monthIndex].applications += 1;
      if (app.status === "Interview") grouped[monthIndex].interviews += 1;
      if (app.status === "Offer") grouped[monthIndex].offers += 1;
    });

    return NextResponse.json(grouped);
  } catch (error) {
    return new NextResponse("[GET_MONTHLY_STATS] Internal Server Error", {
      status: 500,
    });
  }
}
