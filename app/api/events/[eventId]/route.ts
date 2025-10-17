import { connectDB } from "@/lib/mongodb";
import { EventModel } from "@/models/Event";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// GET SPECIFIC EVENT
export async function GET(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    await connectDB();
    const { eventId } = await params;
    const event = await EventModel.findById(eventId);
    if (!event) {
      return new NextResponse("This event doesn't Exist", { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    return new NextResponse("[GET_EVENT] Internal Server Error", {
      status: 500,
    });
  }
}

// DELETE SPECIFIC EVENT
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    await connectDB();
    const { eventId } = await params;
    const event = await EventModel.findById(eventId);
    if (!event) {
      return new NextResponse("This event doesn't Exist", { status: 404 });
    }
    await EventModel.findByIdAndDelete(eventId);
    return new NextResponse("Event Deleted Successfully");
  } catch (error) {
    return new NextResponse("[DELETE_EVENT] Internal Server Error", {
      status: 500,
    });
  }
}

// EDIT SPECIFIC EVENT
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    await connectDB();
    const { eventId } = await params;
    const body = await req.json();
    const event = await EventModel.findById(eventId);
    if (!event) {
      return new NextResponse("This event doesn't Exist", { status: 404 });
    }
    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, {
      ...body,
    });
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return new NextResponse("[GET_EVENT] Internal Server Error", {
      status: 500,
    });
  }
}
