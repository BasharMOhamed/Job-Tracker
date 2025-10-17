import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { EventModel } from "@/models/Event";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    await connectDB();
    const events = await EventModel.find({ userId });
    return NextResponse.json(events);
  } catch (error) {
    return new NextResponse("[GET_EVENTS] Internal Server Error", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    await connectDB();
    const body = await req.json();

    const app = await ApplicationModel.findById(body.applicationId);
    if (app && app.status === "Applied") {
      await ApplicationModel.findByIdAndUpdate(body.applicationId, {
        status: "Interview",
        responseDate: new Date(),
      });
    }
    const newEvent = await EventModel.create({ ...body, userId });
    return NextResponse.json(newEvent);
  } catch (error) {
    return new NextResponse(`[POST_EVENT] Internal Server Error ${error}`, {
      status: 500,
    });
  }
}
