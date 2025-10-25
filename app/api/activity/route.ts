import { connectDB } from "@/lib/mongodb";
import { ActivityModel } from "@/models/Activity";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET ACTIVITIES
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    const searchParams = req.nextUrl.searchParams;
    const countParam = searchParams.get("count") || 4;

    const activities = await ActivityModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(+countParam);

    return NextResponse.json(activities);
  } catch (error) {
    return new NextResponse("[GET_ACTIVITIES] Internal Server Error", {
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
    const activity = await ActivityModel.create({ ...body, userId });

    return NextResponse.json(activity);
  } catch (error) {
    return new NextResponse(`[POST_ACTIVITY] Internal Server Error ${error}`, {
      status: 500,
    });
  }
}
