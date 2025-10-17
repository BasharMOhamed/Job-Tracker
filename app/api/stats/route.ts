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
