import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const applications = await ApplicationModel.find();

    const grouped = {
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
    };

    applications.forEach((app: { status: keyof typeof grouped }) => {
      if (grouped.hasOwnProperty(app.status)) {
        grouped[app.status]++;
      }
    });

    return NextResponse.json(grouped);
  } catch (error) {
    return new NextResponse("[GET_STATS] Internal Server Error", {
      status: 500,
    });
  }
}
