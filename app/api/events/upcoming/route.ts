import { connectDB } from "@/lib/mongodb";
import { EventModel } from "@/models/Event";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const events = await EventModel.find({ date: { $gte: new Date() } }).sort({
      date: 1,
    });

    return NextResponse.json(events);
  } catch (error) {
    return new NextResponse("[GET_UPCOMING_EVENTS] Internal Server Error", {
      status: 500,
    });
  }
}
