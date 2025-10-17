import { connectDB } from "@/lib/mongodb";
import { EventModel } from "@/models/Event";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    await connectDB();
    const events = await EventModel.find({
      date: { $gte: new Date() },
      userId,
    }).sort({
      date: 1,
    });

    return NextResponse.json(events);
  } catch (error) {
    return new NextResponse("[GET_UPCOMING_EVENTS] Internal Server Error", {
      status: 500,
    });
  }
}
