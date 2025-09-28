import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { EventModel } from "@/models/Event";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const events = await EventModel.find();
    return NextResponse.json(events);
  } catch (error) {
    return new NextResponse("[GET_EVENTS] Internal Server Error", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const app = await ApplicationModel.findById(body.applicationId);
    if (app && app.status === "Applied") {
      await ApplicationModel.findByIdAndUpdate(body.applicationId, {
        status: "Interview",
        responseDate: new Date(),
      });
    }
    const newEvent = await EventModel.create(body);
    return NextResponse.json(newEvent);
  } catch (error) {
    return new NextResponse(`[POST_EVENT] Internal Server Error ${error}`, {
      status: 500,
    });
  }
}
